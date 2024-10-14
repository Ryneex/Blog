import { getCurrentUser } from "@/helpers/getCurrentUser"
import Sidebar from "@/components/root/settings/Sidebar"
import { redirect } from "next/navigation"

export default async function layout({ children }: { children: React.ReactNode }) {
    const res = await getCurrentUser()
    if (!res.success) return redirect("/")
    return (
        <div className="overflow-auto">
            <div className="~pb-2/5 container gap-10 sm:flex">
                <Sidebar />
                {children}
            </div>
        </div>
    )
}
