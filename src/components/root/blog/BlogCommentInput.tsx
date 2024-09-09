"use client"

import { cn } from "@/components/shadcn/utils"
import TextareaAutosize from "react-textarea-autosize"
import { useRef, useState } from "react"
import { Button } from "@nextui-org/react"
import { callActionWithToast } from "@/helpers/callActionWithToast"
import { comment } from "@/actions/blog/comment"
import { useRouter } from "next/navigation"

export default function BlogCommentInput({ blogId }: { blogId: string }) {
    const [isFocused, setIsFocused] = useState(false)
    const commentInput = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const [text, setText] = useState("")

    async function submit() {
        const res = await callActionWithToast(comment({ blogId, content: text }))
        if (res.success) {
            router.refresh()
            setIsFocused(false)
            setText("")
        }
    }

    return (
        <div className="relative" ref={commentInput}>
            <TextareaAutosize
                onClick={() => {
                    setIsFocused(true)

                    // Scrolling the container if comment input is not fully visible
                    const container = document.querySelector<HTMLDivElement>(".blogContainer")!
                    const inputTop = commentInput.current!.getBoundingClientRect().top
                    if (inputTop + 130 < innerHeight) return
                    setTimeout(() => container.scrollTo({ behavior: "smooth", top: container.scrollTop + innerHeight / 2 }))
                }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={cn("block w-full resize-none overflow-hidden rounded-3xl border border-gray-300 px-3 py-2 text-sm placeholder:text-black/70 focus:outline-none", isFocused && "min-h-32")}
                placeholder="Add a comment"
            />
            {isFocused && (
                <div className="absolute bottom-2 right-2 flex gap-2">
                    <Button onPress={() => setIsFocused(false)} size="sm" className="rounded-full font-medium" variant="flat">
                        Cancel
                    </Button>
                    <Button onPress={submit} size="sm" className="rounded-full font-medium" color="primary">
                        Comment
                    </Button>
                </div>
            )}
        </div>
    )
}
