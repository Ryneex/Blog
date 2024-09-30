"use client"

import { getTimeAgo } from "@/lib/utils/getTimeAgo"
import { comments, comment_replies, users } from "@prisma/client"
import CommentDeleteButton from "./CommentDeleteButton"
import { Avatar } from "@/components/Avatar"
import BlogCommentLikeCount from "./BlogCommentLikeCount"
import { useState } from "react"
import BlogCommentReplyInput from "./BlogCommentReplyInput"
import Link from "next/link"

type IComment = comments & {
    author: Pick<users, "id" | "name" | "avatarUrl">
    comment_replies: (comment_replies & { author: IComment["author"] })[]
    isLiked: boolean
    _count: {
        comment_likes: number
    }
}

export default function BlogComment({ comment, userId, isLoggedIn }: { comment: IComment; userId?: string; isLoggedIn: boolean }) {
    const [isReplyInputOpen, setIsReplyInputOpen] = useState(false)
    return (
        <div id={comment.id} className="mt-5">
            <div className="flex gap-2" key={comment.id}>
                <div className="flex flex-col items-center gap-1">
                    <Link href={`/user/${comment.author.id}`}>
                        <Avatar size="sm" className="shrink-0" name={comment.author.name} src={comment.author.avatarUrl} />
                    </Link>
                    {!!comment.comment_replies.length && <div className="h-[calc(100%)] w-[1px] bg-gray-300"></div>}
                </div>
                <div className="w-full space-y-1">
                    <div className="flex items-center gap-2">
                        <Link href={`/user/${comment.author.id}`} className="text-sm font-medium text-black/90">
                            {comment.author.name}
                        </Link>
                        <span className="text-xs">{getTimeAgo(comment.createdAt)}</span>
                        {comment.userId === userId && <CommentDeleteButton commentId={comment.id} />}
                    </div>
                    <span className="text-sm text-black/90">{comment.content}</span>
                    <div className="flex items-center gap-3">
                        <BlogCommentLikeCount isLoggedIn={isLoggedIn} commentId={comment.id} liked={comment.isLiked} likes={comment._count.comment_likes} />
                        <span onClick={() => setIsReplyInputOpen(true)} className="cursor-pointer text-xs font-medium">
                            Reply
                        </span>
                    </div>
                    {isReplyInputOpen && <BlogCommentReplyInput onCancel={() => setIsReplyInputOpen(false)} parentId={comment.id} />}
                </div>
            </div>
            {/* Replies */}
            {comment.comment_replies.map((reply, index) => {
                return (
                    <div id={reply.id} className="relative ml-10 flex gap-2 pt-5" key={reply.id}>
                        <div className="flex h-fit items-center gap-1">
                            <Link href={`/user/${reply.author.id}`}>
                                <Avatar size="sm" className="shrink-0" name={reply.author.name} src={reply.author.avatarUrl} />
                            </Link>
                            <div className="absolute right-full h-10 w-[25px] -translate-y-1/2 rounded-bl-xl border-b border-l border-gray-300"></div>
                        </div>
                        {/* render left line on every replies except the last one */}
                        {index !== comment.comment_replies.length - 1 && <div className="bottom-0-0 absolute right-full h-full w-[25px] border-l border-gray-300"></div>}
                        <div className="w-full space-y-3">
                            <div className="flex items-center gap-2">
                                <Link scroll href={`/user/${reply.author.id}`} className="text-sm font-medium text-black/90">
                                    {reply.author.name}
                                </Link>
                                <span className="text-xs">{getTimeAgo(reply.createdAt)}</span>
                                {reply.userId === userId && <CommentDeleteButton commentId={reply.id} />}
                            </div>
                            <span className="text-sm text-black/90">{reply.content}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
