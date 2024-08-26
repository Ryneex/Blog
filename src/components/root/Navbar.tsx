"use client"

import { Avatar, Button, Divider, Listbox, ListboxItem, useDisclosure, User } from "@nextui-org/react"
import Link from "next/link"
import { FaPlus } from "react-icons/fa"
import { RiBloggerLine } from "react-icons/ri"
import { MdLogout } from "react-icons/md"
import { FiUser } from "react-icons/fi"
import { logout } from "@/actions/user/auth/logout"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover"
import { GearIcon } from "@radix-ui/react-icons"
import { IPrivateUser } from "@/types/user"

export default function Navbar({ user }: { user: IPrivateUser | null }) {
    return (
        <div className="shrink-0 border-b border-slate-300">
            <nav className="container flex h-12 items-center justify-between sm:h-16">
                <Link href="/" className="flex items-center gap-1 text-xl font-medium text-blue-800">
                    <RiBloggerLine size={28} />
                    Blog
                </Link>
                {!user ? (
                    <div className="flex gap-3">
                        <a href="/signin">
                            <Button className="h-9 rounded-full" variant="flat">
                                Sign in
                            </Button>
                        </a>
                        <a href="/signup">
                            <Button className="h-9 rounded-full" color="primary">
                                Sign up
                            </Button>
                        </a>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Button as={Link} href="/create" startContent={<FaPlus />} className="h-9 rounded-full" color="primary">
                            Create
                        </Button>
                        <ProfilePopover user={user} />
                    </div>
                )}
            </nav>
        </div>
    )
}

function ProfilePopover({ user }: { user: IPrivateUser }) {
    const router = useRouter()
    const { isOpen, onClose, onOpenChange } = useDisclosure()
    return (
        <Popover isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ base: "sm:w-72" }} placement="bottom-end">
            <PopoverTrigger>
                <Avatar isBordered className="!size-8 cursor-pointer" src={user.avatar_url ? user.avatar_url : undefined} name={user.name} />
            </PopoverTrigger>
            <PopoverContent className="p-3">
                <User className="mr-auto mt-1" name={user.name} description={user.email} avatarProps={{ src: user.avatar_url ? user.avatar_url : undefined }} />
                <Divider className="my-4" />
                <Listbox aria-label="Actions" variant="flat">
                    <ListboxItem startContent={<FiUser className="mb-0.5" />} key="Profile">
                        Your Profile
                    </ListboxItem>
                    <ListboxItem onClick={onClose} href="/settings" as={Link} showDivider startContent={<GearIcon className="mb-0.5" />} key="Settings">
                        Settings
                    </ListboxItem>
                    <ListboxItem
                        onClick={async () => {
                            await logout()
                            router.refresh()
                        }}
                        startContent={<MdLogout className="mb-0.5" />}
                        className="text-red-500"
                        color="danger"
                        key="Logout"
                    >
                        Logout
                    </ListboxItem>
                </Listbox>
            </PopoverContent>
        </Popover>
    )
}
