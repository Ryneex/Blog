"use client"

import { useState } from "react"
import CoverImage from "../BlogCoverImage"
import { Button, Spinner } from "@nextui-org/react"
import { blogValidation } from "@/validations/blog"
import { toast } from "sonner"
import { createBlog } from "@/actions/blog/createBlog"
import { blogs } from "@prisma/client"
import { updateBlog } from "@/actions/blog/updateBlog"
import { useRouter } from "next/navigation"
import { callActionWithToast } from "@/helpers/callActionWithToast"
import "@mdxeditor/editor/style.css"
import dynamic from "next/dynamic"
import EditorHeader from "./EditorHeader"

const MdxEditor = dynamic(() => import("./MdxEditor"), {
    ssr: false,
    loading: () => (
        <div className="grid h-20 items-center">
            <Spinner />
        </div>
    ),
})

export default function BlogEditor({ initialData }: { initialData?: blogs }) {
    const [cover, setCover] = useState<string | File | undefined>(initialData?.coverUrl)
    const [title, setTitle] = useState(initialData?.title || "")
    const [content, setContent] = useState<string>(initialData?.content ?? "")
    const router = useRouter()

    async function publish() {
        const form = new FormData()
        const validate = blogValidation.safeParse({ cover, title, content })
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
        <div className="container mt-10 flex !max-w-4xl flex-col overflow-hidden rounded-md bg-white pb-5">
            <div className="relative aspect-[10/4] shrink-0 overflow-hidden">
                <Button onClick={publish} className="absolute right-2 top-2 z-10 h-9 rounded-full" color="primary">
                    {initialData ? "Save" : "Publish"}
                </Button>
                <CoverImage onValueChange={setCover} src={initialData?.coverUrl} />
            </div>
            <EditorHeader initialValue={title} onValueChange={setTitle} />
            <MdxEditor content={content} onValueChange={setContent} />
        </div>
    )
}
