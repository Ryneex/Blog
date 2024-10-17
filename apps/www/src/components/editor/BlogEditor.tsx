"use client"

import { useRef, useState } from "react"
import BlogCoverImage from "../BlogCoverImage"
import { Button } from "@nextui-org/react"
import { blogValidation } from "@/validations/blog"
import { toast } from "sonner"
import { createBlog } from "@/actions/blog/createBlog"
import { blogs } from "@prisma/client"
import { updateBlog } from "@/actions/blog/updateBlog"
import { useRouter } from "next/navigation"
import { callActionWithToast } from "@/helpers/callActionWithToast"
import EditorHeader from "./EditorHeader"
import { Editor, Content, FixedToolbar, FixedToolbarButtons, createEditor, DefaultEditorConfig } from "@blog/editor/react"
import { parseContent } from "@/helpers/parseContent"

export default function BlogEditor({ initialData }: { initialData?: blogs }) {
    const [cover, setCover] = useState<string | File | undefined>(initialData?.coverUrl)
    const [title, setTitle] = useState(initialData?.title || "")
    const router = useRouter()
    const editor = useRef(createEditor({ ...DefaultEditorConfig, value: parseContent(initialData?.content) }))

    async function publish() {
        const form = new FormData()
        const validate = blogValidation.safeParse({ cover, title, content: JSON.stringify(editor.current.children) })
        if (!validate.success)
            return toast.warning(validate.error.issues[0].message, {
                position: "top-center",
            })
        form.append("cover", validate.data.cover)
        form.append("title", validate.data.title)
        form.append("content", validate.data.content)
        initialData && form.append("id", initialData.id)
        const response = await callActionWithToast(initialData ? updateBlog(form) : createBlog(form), "Blog has been saved")
        if (response.success) {
            router.push(`/blog/${response.blog.id}`)
            router.refresh()
        }
    }

    return (
        <div className="overflow-auto">
            <div className="container mt-10 flex !max-w-5xl flex-col rounded-md bg-white pb-5 pt-8">
                <div className="relative aspect-[10/4] shrink-0 overflow-hidden">
                    <Button onClick={publish} className="absolute right-2 top-2 z-10 h-9 rounded-full" color="primary">
                        {initialData ? "Save" : "Publish"}
                    </Button>
                    <BlogCoverImage onValueChange={setCover} src={initialData?.coverUrl} />
                </div>
                <EditorHeader initialValue={title} onValueChange={setTitle} />
                <Editor editor={editor.current}>
                    <FixedToolbar className="border">
                        <FixedToolbarButtons />
                    </FixedToolbar>
                    <Content className="rounded-tl-none rounded-tr-none border-t-0" />
                </Editor>
            </div>
        </div>
    )
}
