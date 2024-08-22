"use client"

import { cn } from "@/components/shadcn/utils"
import { Listbox, ListboxItem } from "@nextui-org/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MdOutlineAccountCircle } from "react-icons/md"
import { GrShieldSecurity } from "react-icons/gr"

export default function Sidebar() {
    const pathname = usePathname()
    const bg = "bg-[hsl(var(--nextui-default)/0.4)]"
    const links = [
        {
            name: "Account",
            href: "/settings",
            icon: MdOutlineAccountCircle,
        },
        {
            name: "Security",
            href: "/settings/security",
            icon: GrShieldSecurity,
        },
    ]

    return (
        <div className="w-full shrink-0 sm:max-w-[180px] lg:max-w-[230px]">
            <h1 className="mb-2 hidden text-lg font-medium sm:block">Settings</h1>
            <Listbox className="hidden text-black/70 sm:block" aria-label="Settings tab">
                {links.map((e, i) => (
                    <ListboxItem
                        startContent={<e.icon className="mb-0.5" />}
                        as={Link}
                        href={e.href}
                        classNames={{ title: "font-medium" }}
                        className={cn(pathname === e.href && [bg, "border-l-2 border-blue-600 text-black/80"])}
                        variant="flat"
                        key={i}
                    >
                        {e.name}
                    </ListboxItem>
                ))}
            </Listbox>
            {/* Visible on smaller device */}
            <div className="mb-2 flex w-full gap-5 border-b pb-2 sm:hidden">
                {links.map((e, i) => (
                    <e.icon key={i} size={32} className={cn("rounded-md bg-gray-200 p-1.5 text-gray-500", pathname === e.href && "bg-blue-100 text-blue-600")} />
                ))}
            </div>
        </div>
    )
}
