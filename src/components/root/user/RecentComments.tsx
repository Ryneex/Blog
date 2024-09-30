import { Avatar } from "@/components/Avatar"
import { client } from "@/lib/prismaClient"
import Link from "next/link"

export default async function RecentComments({ userId }: { userId: string }) {
    const commentsPromise = client.comments.findMany({
        where: { userId },
        select: {
            id: true,
            author: { select: { id: true, name: true, avatarUrl: true } },
            blog: { select: { id: true, author: { select: { id: true, name: true } } } },
            createdAt: true,
        },
        take: 3,
    })

    const repliesPromise = client.comment_replies.findMany({
        where: { userId },
        select: {
            id: true,
            author: { select: { id: true, name: true, avatarUrl: true } },
            parentComment: { select: { author: { select: { id: true, name: true } }, blog: { select: { id: true } } } },
            createdAt: true,
        },
        take: 3,
    })

    const [comments, replies] = await Promise.all([commentsPromise, repliesPromise])

    // merging replies and comments together to show on `Recent Comments` section.
    const mergedComments = [...comments.map((e) => ({ ...e, isReply: false as false })), ...replies.map((e) => ({ ...e, isReply: true as true }))]
    // sorting merged comments by their creatation date in ascending order
    const sortedComments = mergedComments.sort((a, b) => b.createdAt.getMilliseconds() - a.createdAt.getMilliseconds())

    function Comment({ children }: { children?: React.ReactNode }) {
        return (
            <div className="flex gap-2">
                <Avatar size="sm" className="shrink-0" name={comments[0]?.author.name} src={comments[0]?.author.avatarUrl} />
                <span className="text-sm text-black/70">{children}</span>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {sortedComments.length ? (
                mergedComments.map((comment) => {
                    const nameElement = <span className="font-semibold text-black/70">{comment.author.name}</span>

                    // if root comment
                    if (!comment.isReply) {
                        // if user commented on his own blog
                        if (comment.author.id === comment.blog.author.id)
                            return (
                                <Comment key={comment.id}>
                                    {nameElement} commented on his own&nbsp;
                                    <Link className="cursor-pointer font-semibold text-black/70" href={`/blog/${comment.blog.id}#${comment.id}`}>
                                        blog
                                    </Link>
                                </Comment>
                            )
                        return (
                            <Comment key={comment.id}>
                                {nameElement} commented on&nbsp;
                                <Link className="cursor-pointer font-semibold text-black/70" href={`/blog/${comment.blog.id}#${comment.id}`}>
                                    {comment.blog.author.name}
                                </Link>
                                &apos;s blog
                            </Comment>
                        )
                    }

                    // if user replied to his own comment
                    if (comment.author.id === comment.parentComment.author.id)
                        return (
                            <Comment key={comment.id}>
                                <span className="font-semibold text-black/90">{nameElement}</span> replied to his own&nbsp;
                                <Link className="cursor-pointer font-semibold text-black/70" href={`/blog/${comment.parentComment.blog.id}#${comment.id}`}>
                                    comment
                                </Link>
                            </Comment>
                        )

                    return (
                        <Comment key={comment.id}>
                            {nameElement} replied to&nbsp;
                            <Link className="cursor-pointer font-semibold text-black/70" href={`/blog/${comment.parentComment.blog.id}#${comment.id}`}>
                                {comment.parentComment.author.name}
                            </Link>
                            &apos;s comment
                        </Comment>
                    )
                })
            ) : (
                <div className="mt-5 text-center text-sm text-black/70">This user has no comments</div>
            )}
        </div>
    )
}
