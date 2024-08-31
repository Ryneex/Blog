"use client"

import CoverImage from "@/components/CoverImage"
import EditorText from "@/components/EditorText"
import { store } from "@/store/store"
import { BlockNoteView } from "@blocknote/mantine"
import { ErrorBoundary } from "react-error-boundary"
import { useCreateBlockNote } from "@blocknote/react"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react"
import { blogs } from "@prisma/client"
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

export default function BlogPreview({ data }: { data: blogs & { author: IBaseUser } }) {
    const { user } = useSnapshot(store)
    const router = useRouter()

    return (
        <div className="container mt-7 flex flex-col overflow-hidden rounded-md bg-transparent pb-5">
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
                <CoverImage isPreview src={data.coverUrl} />
            </div>
            <EditorText className="px-1" isPreview initialValue={data.title} variant="heading" />
            <EditorText className="px-1" isPreview initialValue={data.description} variant="paragraph" />
            <ErrorBoundary FallbackComponent={InvalidContent}>
                <style dangerouslySetInnerHTML={{ __html: `.bn-editor{padding-left:4px; padding-right:4px;}` }}></style>
                <BlockNote content={data.content} />
            </ErrorBoundary>
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
