"use client"

import { likeBlog } from "@/actions/blog/likeBlog"
import { useState } from "react"
import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import { CiChat2 } from "react-icons/ci"

export default function BlogLikeCount({ likes, comments, blogId, liked }: { likes: number; comments: number; liked: boolean; blogId: string }) {
    const [isLiked, setIsLiked] = useState(liked)
    const [likeCount, setLikeCount] = useState(likes)
    return (
        <div className="mt-5 flex select-none gap-5 border-t pt-5">
            <div
                className="flex h-7 cursor-pointer items-center gap-2 rounded-full bg-gray-200 px-3"
                onClick={() => {
                    likeBlog(blogId)
                    setLikeCount((e) => (isLiked ? --e : ++e))
                    setIsLiked(() => !isLiked)
                }}
            >
                {isLiked ? <AiFillLike className="text-blue-600" size={20} /> : <AiOutlineLike size={20} />} <span>{likeCount}</span>
            </div>
            <div className="flex h-7 cursor-pointer items-center gap-2 rounded-full bg-gray-200 px-3">
                <CiChat2 className="stroke-[0.5]" size={20} /> <span>{comments}</span>
            </div>
        </div>
    )
}
