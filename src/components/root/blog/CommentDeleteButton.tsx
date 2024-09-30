"use client"

import { deleteComment } from "@/actions/comment/deleteComment"
import { deleteReply } from "@/actions/comment/deleteReply"
import { callActionWithToast } from "@/helpers/callActionWithToast"
import { useRouter } from "next/navigation"
import { FaTrash } from "react-icons/fa"

export default function CommentDeleteButton({ commentId, isReply = false }: { commentId: string; isReply?: false }) {
    const router = useRouter()
    return (
        <div
            onClick={async () => {
                const result = await callActionWithToast(isReply ? deleteReply(commentId) : deleteComment(commentId))
                if (result.success) router.refresh()
            }}
            className="ml-auto"
        >
            <FaTrash className="cursor-pointer" size={12} />
        </div>
    )
}
