import Navbar from "@/components/Navbar"
import RootLayoutProvider from "@/components/RootLayoutProvider"
import { getCurrentUser } from "@/helpers/getCurrentUser"
import { SelectKeys } from "@/helpers/selectKeys"

export default async function layout({ children }: { children: React.ReactNode }) {
    const res = await getCurrentUser()
    const user = res.success ? SelectKeys(res.user, ["id", "name", "avatar_url", "email", "bio"]) : undefined
    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <Navbar user={user} />
            <RootLayoutProvider user={user}>{children}</RootLayoutProvider>
        </div>
    )
}
