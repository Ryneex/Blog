import BlogCoverImage from "@/components/BlogCoverImage"
import { User } from "@nextui-org/react"
import { blogs, likes } from "@prisma/client"
import { DateTime } from "luxon"
import { IBaseUser } from "@/types/user"
import EditorHeader from "@/components/editor/EditorHeader"
import Markdown from "react-markdown"
import CodeBlock from "./CodeBlock"
import BlogOptionsDropdown from "./BlogOptionsDropdown"
import BlogLikeCount from "./BlogLikeCount"

type IProps = {
    author: IBaseUser
    _count: { likes: number; comments: number }
    likes: likes[]
} & blogs

export default function BlogPreview({ data }: { data: IProps }) {
    return (
        <div className="pb-7">
            <div className="flex items-center justify-between">
                <User
                    className="mb-3 mr-auto"
                    name={data.author.name}
                    description={DateTime.fromJSDate(data.createdAt).toFormat("dd LLL yyyy")}
                    avatarProps={{ src: data.author.avatarUrl ?? undefined }}
                />
                {<BlogOptionsDropdown blogId={data.id} authorId={data.authorId} />}
            </div>
            <div className="relative aspect-[10/4] shrink-0 overflow-hidden">
                <BlogCoverImage isPreview src={data.coverUrl} />
            </div>
            <EditorHeader className="mb-5 border-b" isPreview initialValue={data.title} />
            <Markdown
                className="prose max-w-none rounded-md prose-h1:font-bold prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0"
                components={{ code: ({ className, children }) => <CodeBlock code={children?.toString() || ""} language={className?.replace("language-", "") || "text"} /> }}
            >
                {data.content}
            </Markdown>
            <BlogLikeCount blogId={data.id} comments={data._count.comments} likes={data._count.likes} liked={!!data.likes[0]} />
        </div>
    )
}
