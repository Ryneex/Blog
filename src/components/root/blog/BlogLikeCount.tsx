"use client"

import { likeBlog } from "@/actions/blog/likeBlog"
import { cn } from "@/components/shadcn/utils"
import { useState } from "react"
import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import { CiChat2 } from "react-icons/ci"

export default function BlogLikeCount({ likes, comments, blogId, liked, isLoggedIn }: { likes: number; comments: number; liked: boolean; blogId: string; isLoggedIn: boolean }) {
    const [isLiked, setIsLiked] = useState(liked)
    const [likeCount, setLikeCount] = useState(likes)
    return (
        <div className="mt-5 flex select-none gap-10 border-t pt-2">
            <div className="flex items-center gap-2">
                <button
                    disabled={!isLoggedIn}
                    onClick={() => {
                        likeBlog(blogId)
                        setLikeCount((e) => (isLiked ? --e : ++e))
                        setIsLiked(() => !isLiked)
                    }}
                    className={cn("rounded-full p-1.5", isLoggedIn && "cursor-pointer hover:bg-blue-200")}
                >
                    {isLiked ? <AiFillLike className="text-blue-600" size={20} /> : <AiOutlineLike size={20} />}
                </button>
                <span>{likeCount}</span>
            </div>
            <div className="flex cursor-pointer items-center gap-2">
                <CiChat2 className="stroke-[0.5]" size={20} /> <span>{comments}</span>
            </div>
        </div>
    )
}
