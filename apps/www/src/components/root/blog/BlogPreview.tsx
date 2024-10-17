import BlogCoverImage from "@/components/BlogCoverImage"
import { User } from "@nextui-org/react"
import { blogs } from "@prisma/client"
import { DateTime } from "luxon"
import { IBaseUser } from "@/types/user"
import EditorHeader from "@/components/editor/EditorHeader"
import BlogOptionsDropdown from "./BlogOptionsDropdown"
import BlogLikeCount from "./BlogLikeCount"
import Link from "next/link"
import { getCurrentUser } from "@/helpers/getCurrentUser"
import BlogEditorPreview from "./BlogEditorPreview"

type IProps = {
    author: IBaseUser
    _count: { likes: number; comments: number }
    isLiked: boolean
} & blogs

export default async function BlogPreview({ data }: { data: IProps }) {
    const { user } = await getCurrentUser()
    return (
        <div className="pb-2">
            <div className="flex items-center justify-between">
                <User
                    className="mb-3 mr-auto"
                    name={<Link href={`/user/${data.author.id}`}>{data.author.name}</Link>}
                    description={DateTime.fromJSDate(data.createdAt).toFormat("dd LLL yyyy")}
                    avatarProps={{ src: data.author.avatarUrl ?? undefined }}
                />
                <BlogOptionsDropdown currentUserId={user?.id} blogId={data.id} authorId={data.authorId} />
            </div>
            <div className="relative aspect-[10/4] shrink-0 overflow-hidden">
                <BlogCoverImage isPreview src={data.coverUrl} />
            </div>
            <EditorHeader className="mb-5 border-b" isPreview initialValue={data.title} />
            <BlogEditorPreview value={data.content} />
            <BlogLikeCount isLoggedIn={!!user} blogId={data.id} comments={data._count.comments} likes={data._count.likes} liked={data.isLiked} />
        </div>
    )
}
