import { getCurrentUser } from "@/helpers/getCurrentUser"
import Sidebar from "@/components/root/settings/Sidebar"
import { redirect } from "next/navigation"

export default async function layout({ children }: { children: React.ReactNode }) {
    const res = await getCurrentUser()
    if (!res.success) redirect("/")
    return (
        <div className="container h-full gap-10 overflow-auto py-2 sm:flex sm:py-5">
            <Sidebar />
            {children}
        </div>
    )
}
