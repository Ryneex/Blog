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
            href: "/security",
            icon: GrShieldSecurity,
        },
    ]

    return (
        <div className="w-full max-w-[230px] shrink-0">
            <h1 className="mb-2 text-lg font-medium">Settings</h1>
            <Listbox className="text-black/70" aria-label="Settings tab">
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
        </div>
    )
}
