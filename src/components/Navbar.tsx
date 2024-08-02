"use client"

import { Avatar, Button, Divider, Input, Listbox, ListboxItem, User } from "@nextui-org/react"
import { user } from "@prisma/client"
import Link from "next/link"
import { FaPlus, FaSearch } from "react-icons/fa"
import { RiBloggerLine } from "react-icons/ri"
import { MdLogout } from "react-icons/md"
import { FiUser } from "react-icons/fi"
import { logout } from "@/actions/user/logout"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/ui/popover"
import { GearIcon } from "@radix-ui/react-icons"

export default function Navbar({ user }: { user?: Pick<user, "name" | "avatar_url" | "email"> }) {
    const router = useRouter()
    return (
        <nav className="flex h-14 shrink-0 items-center justify-between bg-white px-5">
            <div className="flex gap-5">
                <Link href="/" className="flex items-center gap-1 text-lg font-medium text-blue-800">
                    <RiBloggerLine size={25} />
                    Blog
                </Link>
                <Input type="text" placeholder="Search..." labelPlacement="outside" size="sm" startContent={<FaSearch className="mx-1" />} />
            </div>
            {!user ? (
                <div className="flex gap-3">
                    <Link href="/signin">
                        <Button className="h-9 rounded-full" variant="flat">
                            Sign in
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="h-9 rounded-full" color="primary">
                            Sign up
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <Button as={Link} href="/create" startContent={<FaPlus />} className="h-9 rounded-full" color="primary">
                        Create
                    </Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar isBordered className="!size-8 cursor-pointer" src={user.avatar_url ? user.avatar_url : undefined} name={user.name} />
                        </PopoverTrigger>
                        <PopoverContent align="end">
                            <User name={user.name} description={user.email} avatarProps={{ src: user.avatar_url ? user.avatar_url : undefined }} />
                            <Divider className="my-4" />
                            <Listbox aria-label="Actions" variant="flat">
                                <ListboxItem startContent={<FiUser className="mb-0.5" />} key="Profile">
                                    Your Profile
                                </ListboxItem>
                                <ListboxItem showDivider startContent={<GearIcon className="mb-0.5" />} key="Settings">
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
                </div>
            )}
        </nav>
    )
}
