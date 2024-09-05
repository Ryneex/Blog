import { DateTime } from "luxon"
import BlogCommentInput from "./BlogCommentInput"
import { Avatar } from "@nextui-org/react"
import { client } from "@/lib/prismaClient"
import { getColorBasedOnText } from "@/lib/utils"

export default async function BlogComment({ blogId }: { blogId: string }) {
    const comments = await client.comments.findMany({ where: { blogId }, include: { author: { select: { id: true, name: true, avatarUrl: true } } } })
    return (
        <div>
            <BlogCommentInput blogId={blogId} />
            <div className="mt-5 flex flex-col gap-8">
                {comments.map((comment) => (
                    <div className="flex gap-2" key={comment.id}>
                        <Avatar
                            size="sm"
                            style={{ backgroundColor: comment.author.avatarUrl ? undefined : getColorBasedOnText(comment.author.name) }}
                            className="text-white"
                            name={comment.author.name.slice(0, 2)}
                            src={comment.author.avatarUrl ?? undefined}
                        />
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <span className="text-sm font-medium text-black/90">{comment.author.name}</span>
                                <span className="text-xs">{getTimeAgo(comment.createdAt)}</span>
                            </div>
                            <span className="text-sm text-black/90">{comment.content}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function getTimeAgo(date: Date) {
    const luxonDate = DateTime.fromJSDate(date).toRelative()
    return luxonDate?.replace(/ minutes| minute | hours| hour| days| day| months| month| years| year/, (word) => {
        const mapping = { minute: "m", minutes: "m", hour: "h", hours: "h", day: "d", days: "d", month: "mon", months: "mon", year: "y", years: "y" }
        return mapping[word.trim() as keyof typeof mapping]
    })
}
