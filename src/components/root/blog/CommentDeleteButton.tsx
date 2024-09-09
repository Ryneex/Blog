"use client"

import { deleteComment } from "@/actions/blog/deleteComment"
import { callActionWithToast } from "@/helpers/callActionWithToast"
import { useRouter } from "next/navigation"
import { FaTrash } from "react-icons/fa"

export default function CommentDeleteButton({ commentId }: { commentId: string }) {
    const router = useRouter()
    return (
        <div
            onClick={async () => {
                const result = await callActionWithToast(deleteComment(commentId))
                if (result.success) router.refresh()
            }}
            className="ml-auto"
        >
            <FaTrash className="cursor-pointer" size={12} />
        </div>
    )
}
