"use client"

import { BreadcrumbItem, Breadcrumbs, Button, Chip } from "@nextui-org/react"
import { FaDesktop } from "react-icons/fa"
import { session } from "@prisma/client"
import { DateTime } from "luxon"
import { deleteOtherSessions } from "@/actions/user/auth/deleteOtherSessions"
import { useRouter } from "next/navigation"

export default function SecuritySettings({ sessions }: { sessions: (Omit<session, "id"> & { isCurrent: boolean })[] }) {
    const router = useRouter()
    return (
        <div className="w-full">
            <Breadcrumbs className="hidden sm:block">
                <BreadcrumbItem>Settings</BreadcrumbItem>
                <BreadcrumbItem>Account</BreadcrumbItem>
            </Breadcrumbs>
            <div className="mt-3 flex items-center justify-between">
                <h1 className="text-2xl font-medium text-black/70">Security</h1>
                <Button
                    onClick={async () => {
                        await deleteOtherSessions()
                        router.refresh()
                    }}
                    className="h-9 rounded-full bg-red-500"
                    color="danger"
                >
                    Delete other sessions
                </Button>
            </div>
            <div className="flex flex-col gap-5 py-3">
                {sessions.map((e, i) => (
                    <div key={i} className="space-y-2 rounded-xl border p-5">
                        <div className="fluid-text-md font-medium">{DateTime.fromJSDate(e.createdAt).toFormat("DDD")}</div>
                        <div className="flex items-center gap-5">
                            <FaDesktop className="text-black/70" size={70} />
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-black/70">{e.info.os}</span>
                                    {e.isCurrent && (
                                        <Chip size="sm" color="primary" variant="flat" className="!h-fit p-0.5">
                                            Current
                                        </Chip>
                                    )}
                                </div>
                                {/* prettier-ignore */}
                                <div className="flex flex-col text-[13px] font-medium leading-tight text-black/50">
                                    <span>{e.info.browser} | {e.info.browser_version}</span>
                                    <span>{e.ip} | ({e.info.location ?? "Location not found"})</span>
                                    <span>{DateTime.fromJSDate(e.createdAt).toFormat("D")} @ {DateTime.fromJSDate(e.createdAt).toFormat("tt")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
