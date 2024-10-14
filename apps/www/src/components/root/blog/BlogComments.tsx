import BlogCommentInput from "./BlogCommentInput"
import { client } from "@/lib/prismaClient"
import BlogComment from "./BlogComment"
import { getCurrentUser } from "@/helpers/getCurrentUser"
import ScrollToComment from "./ScrollToComment"
import { ExcludeKeys } from "@/helpers/excludeKeys"

export default async function BlogComments({ blogId }: { blogId: string }) {
    const { user } = await getCurrentUser()
    const comments = await client.comments.findMany({
        where: { blogId },
        include: {
            author: { select: { id: true, name: true, avatarUrl: true } },
            comment_replies: { include: { author: { select: { id: true, name: true, avatarUrl: true } } } },
            comment_likes: { where: { userId: user?.id } },
            _count: { select: { comment_likes: true } },
        },
        orderBy: { createdAt: "desc" },
    })

    // adding isLiked field to let frontend know if this comment is liked by user or not
    const filteredComments = comments.map((comment) => ({ ...ExcludeKeys(comment, ["comment_likes"]), isLiked: !!comment.comment_likes.length }))

    return (
        <div>
            <BlogCommentInput isLoggedIn={!!user} blogId={blogId} />
            <div>
                {filteredComments.map((comment) => (
                    <BlogComment isLoggedIn={!!user} userId={user?.id} key={comment.id} comment={comment} />
                ))}
            </div>
            {/* this component isn't used for rendering */}
            <ScrollToComment />
        </div>
    )
}
