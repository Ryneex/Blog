"use client"

import TextareaAutosize from "react-textarea-autosize"
import { useState } from "react"
import { Button } from "@nextui-org/react"
import { callActionWithToast } from "@/helpers/callActionWithToast"
import { useRouter } from "next/navigation"
import { replyToComment } from "@/actions/comment/replyToComment"

export default function BlogCommentReplyInput({ parentId, onCancel }: { parentId: string; onCancel(): void }) {
    const router = useRouter()
    const [text, setText] = useState("")

    async function submit() {
        const res = await callActionWithToast(replyToComment({ parentId, content: text }))
        if (res.success) {
            router.refresh()
            setText("")
        }
    }

    return (
        <div className="relative">
            <TextareaAutosize
                value={text}
                onChange={(e) => setText(e.target.value)}
                minRows={3}
                className="block h-[38px] w-full resize-none overflow-hidden rounded-3xl border border-gray-300 bg-white/30 px-3 py-2 text-sm duration-300 transition-height placeholder:text-black/70 focus:outline-none"
                placeholder="Add a reply"
            />
            <div className="absolute bottom-2 right-2 flex gap-2">
                <Button onPress={onCancel} size="sm" className="rounded-full font-medium" variant="flat">
                    Cancel
                </Button>
                <Button onPress={submit} size="sm" className="rounded-full font-medium" color="primary">
                    Comment
                </Button>
            </div>
        </div>
    )
}
