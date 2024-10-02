import BlogCoverImage from "@/components/BlogCoverImage"
import { User } from "@nextui-org/react"
import { blogs } from "@prisma/client"
import { DateTime } from "luxon"
import { IBaseUser } from "@/types/user"
import EditorHeader from "@/components/editor/EditorHeader"
import Markdown from "react-markdown"
import CodeBlock from "./CodeBlock"
import BlogOptionsDropdown from "./BlogOptionsDropdown"
import BlogLikeCount from "./BlogLikeCount"
import Link from "next/link"
import { getCurrentUser } from "@/helpers/getCurrentUser"

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
            <Markdown
                className="prose max-w-none rounded-md prose-h1:font-bold prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0"
                components={{
                    pre: ({ children }) => {
                        if (children !== null && typeof children === "object" && "props" in children) {
                            return <CodeBlock code={children.props.children?.toString() || ""} language={children.props.className?.replace("language-", "") || "text"} />
                        }
                        return <div>{children}</div>
                    },
                    code: ({ children }) => {
                        return <span className="mx-1 rounded-md border border-zinc-300 bg-zinc-200 px-1 font-mono">{children}</span>
                    },
                }}
            >
                {data.content}
            </Markdown>
            <BlogLikeCount isLoggedIn={!!user} blogId={data.id} comments={data._count.comments} likes={data._count.likes} liked={data.isLiked} />
        </div>
    )
}
