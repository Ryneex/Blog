"use client"

import BlogCoverImage from "@/components/BlogCoverImage"
import EditorText from "@/components/editor/EditorText"
import { store } from "@/store/store"
import { BlockNoteView } from "@blocknote/mantine"
import { ErrorBoundary } from "react-error-boundary"
import { useCreateBlockNote } from "@blocknote/react"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react"
import { blogs, likes } from "@prisma/client"
import { DateTime } from "luxon"
import { useSnapshot } from "valtio"
import Alert from "@/components/Alert"
import { IBaseUser } from "@/types/user"
import { FiTrash } from "react-icons/fi"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MdEdit } from "react-icons/md"
import { callActionWithToast } from "@/helpers/callActionWithToast"
import { deleteBlog } from "@/actions/blog/deleteBlog"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { likeBlog } from "@/actions/blog/likeBlog"
import { useState } from "react"
import { AiOutlineLike } from "react-icons/ai"
import { AiFillLike } from "react-icons/ai"
import { CiChat2 } from "react-icons/ci"

type IProps = {
    author: IBaseUser
    _count: { likes: number; comments: number }
    likes: likes[]
} & blogs

export default function BlogPreview({ data }: { data: IProps }) {
    const { user } = useSnapshot(store)
    const router = useRouter()
    const [isLiked, setIsLiked] = useState(data.likes[0] ? true : false)
    const [likeCount, setLikeCount] = useState(data._count.likes)

    return (
        <div className="pb-7">
            <div className="flex items-center justify-between">
                <User
                    className="mb-3 mr-auto"
                    name={data.author.name}
                    description={DateTime.fromJSDate(data.createdAt).toFormat("dd LLL yyyy")}
                    avatarProps={{ src: data.author.avatarUrl ?? undefined }}
                />
                {user?.id === data.authorId && (
                    <div>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <div className="cursor-pointer">
                                    <BsThreeDotsVertical />
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu title="Actions">
                                <DropdownItem href={`${data.id}/edit`} as={Link} endContent={<MdEdit />} variant="flat" showDivider>
                                    Edit
                                </DropdownItem>
                                <DropdownItem
                                    onClick={async () => {
                                        const res = await callActionWithToast(deleteBlog(data.id))
                                        if (res.success) router.replace("/")
                                    }}
                                    className="text-red-500"
                                    endContent={<FiTrash />}
                                    variant="flat"
                                    color="danger"
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                )}
            </div>
            <div className="relative aspect-[10/4] shrink-0 overflow-hidden">
                <BlogCoverImage isPreview src={data.coverUrl} />
            </div>
            <EditorText className="px-1" isPreview initialValue={data.title} variant="heading" />
            <EditorText className="px-1" isPreview initialValue={data.description} variant="paragraph" />
            <ErrorBoundary FallbackComponent={InvalidContent}>
                {/* This style removes the padding from the editor */}
                <style dangerouslySetInnerHTML={{ __html: `.bn-editor{padding-left:4px; padding-right:4px;}` }}></style>
                <BlockNote content={data.content} />
            </ErrorBoundary>
            <div className="flex select-none gap-5 border-t pt-5">
                <div
                    className="flex h-7 cursor-pointer items-center gap-2 rounded-full bg-gray-200 px-3"
                    onClick={() => {
                        likeBlog(data.id)
                        setLikeCount((e) => (isLiked ? --e : ++e))
                        setIsLiked(() => !isLiked)
                    }}
                >
                    {isLiked ? <AiFillLike className="text-blue-600" size={20} /> : <AiOutlineLike size={20} />} <span>{likeCount}</span>
                </div>
                <div className="flex h-7 cursor-pointer items-center gap-2 rounded-full bg-gray-200 px-3">
                    <CiChat2 className="stroke-[0.5]" size={20} /> <span>{data._count.comments}</span>
                </div>
            </div>
        </div>
    )
}

function InvalidContent() {
    return <Alert className="mt-5" message="Invalid Content" variant="error" />
}

function BlockNote({ content }: { content: string }) {
    const blocknote = useCreateBlockNote({
        initialContent: JSON.parse(content),
    })
    return <BlockNoteView editable={false} theme="light" editor={blocknote} />
}
