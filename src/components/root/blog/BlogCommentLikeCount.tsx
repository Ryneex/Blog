"use client"

import { likeComment } from "@/actions/comment/likeComment"
import { cn } from "@/components/shadcn/utils"
import React, { useState } from "react"
import { AiFillLike, AiOutlineLike } from "react-icons/ai"

export default function BlogCommentLikeCount({ likes, liked, commentId, isLoggedIn }: { likes: number; liked: boolean; commentId: string; isLoggedIn: boolean }) {
    const [isLiked, setIsLiked] = useState(liked)
    const [likeCount, setLikeCount] = useState(likes)

    return (
        <div className="flex items-center gap-1">
            <button
                disabled={!isLoggedIn}
                onClick={() => {
                    likeComment(commentId)
                    setLikeCount((e) => (isLiked ? --e : ++e))
                    setIsLiked(() => !isLiked)
                }}
                className={cn("rounded-full p-1", isLoggedIn && "cursor-pointer hover:bg-blue-200")}
            >
                {isLiked ? <AiFillLike className="text-blue-600" size={16} /> : <AiOutlineLike size={16} />}
            </button>
            <span className="text-sm">{likeCount}</span>
        </div>
    )
}
