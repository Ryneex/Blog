"use client"

import "@blocknote/core/fonts/inter.css"
import { PartialBlock } from "@blocknote/core"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import { useEffect, useState } from "react"
import CoverImage from "./CoverImage"
import EditorText from "./EditorText"
import { Button } from "@nextui-org/react"
import { blogValidation } from "@/validations/blog"
import { toast } from "sonner"
import { createBlog } from "@/actions/blog/createBlog"
import { blog } from "@prisma/client"
import { updateBlog } from "@/actions/blog/updateBlog"
import { useRouter } from "next/navigation"
import { callActionWithToast } from "@/helpers/callActionWithToast"

export default function Editor({ initialData }: { initialData?: blog }) {
    const [cover, setCover] = useState<string | File | undefined>(initialData?.cover_url)
    const [title, setTitle] = useState(initialData?.title || "")
    const [description, setDescription] = useState(initialData?.description || "")
    const [content, setContent] = useState<PartialBlock[]>([])
    const router = useRouter()

    const blocknote = useCreateBlockNote({
        initialContent: initialData?.content && JSON.parse(initialData.content),
    })

    async function publish() {
        const form = new FormData()
        const validate = blogValidation.safeParse({ cover, title, description, content: JSON.stringify(content) })
        if (!validate.success)
            return toast.warning(validate.error.issues[0].message, {
                position: "top-center",
            })
        form.append("cover", validate.data.cover)
        form.append("title", validate.data.title)
        form.append("description", validate.data.description)
        form.append("content", validate.data.content)
        initialData && form.append("id", initialData.id)
        const response = await callActionWithToast(initialData ? updateBlog(form) : createBlog(form), "Blog has been saved")
        if (response.success) {
            router.refresh()
            router.push(`/blog/${response.blog.id}`)
        }
    }

    useEffect(() => {
        setContent(blocknote.document)
        blocknote.onChange((state) => setContent(state.document))
    }, [blocknote])

    return (
        <div className="mx-auto mt-10 flex max-w-4xl flex-col overflow-hidden rounded-md bg-white pb-5">
            <div className="relative aspect-[10/4] shrink-0 overflow-hidden">
                <Button onClick={publish} className="absolute right-2 top-2 z-10 h-9 rounded-full" color="primary">
                    {initialData ? "Save" : "Publish"}
                </Button>
                <CoverImage onValueChange={setCover} src={initialData?.cover_url} />
            </div>
            <EditorText initialValue={title} onValueChange={setTitle} variant="heading" />
            <EditorText initialValue={description} onValueChange={setDescription} variant="paragraph" />
            <BlockNoteView theme="light" editor={blocknote} />
        </div>
    )
}
