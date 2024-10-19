"use client"

import Link from "next/link"
import { MdEdit } from "react-icons/md"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { deleteBlog } from "@/actions/blog/deleteBlog"
import { callActionWithToast } from "@/helpers/callActionWithToast"
import { FiTrash } from "react-icons/fi"
import { useRouter } from "next-nprogress-bar"

export default function BlogOptionsDropdown({ blogId, authorId, currentUserId }: { blogId: string; authorId: string; currentUserId?: string }) {
    const router = useRouter()
    if (currentUserId === authorId)
        return (
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <div className="cursor-pointer">
                        <BsThreeDotsVertical />
                    </div>
                </DropdownTrigger>
                <DropdownMenu title="Actions">
                    <DropdownItem href={`${blogId}/edit`} as={Link} endContent={<MdEdit />} variant="flat" showDivider>
                        Edit
                    </DropdownItem>
                    <DropdownItem
                        onClick={async () => {
                            const res = await callActionWithToast(deleteBlog(blogId))
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
        )
}
