import Navbar from "@/components/Navbar"
import RootLayoutProvider from "@/components/RootLayoutProvider"
import { getCurrentUser } from "@/helpers/getCurrentUser"

export default async function layout({ children }: { children: React.ReactNode }) {
    const { user } = await getCurrentUser()
    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <Navbar user={user} />
            <RootLayoutProvider user={user}>{children}</RootLayoutProvider>
        </div>
    )
}
