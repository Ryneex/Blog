import Navbar from "@/components/root/Navbar"
import RootLayoutProvider from "@/components/root/RootLayoutProvider"
import { getCurrentUser } from "@/helpers/getCurrentUser"
import NextTopLoader from "nextjs-toploader"

export default async function layout({ children }: { children: React.ReactNode }) {
    const { user } = await getCurrentUser()
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
            <Navbar user={user} />
            <RootLayoutProvider user={user}>{children}</RootLayoutProvider>
            <NextTopLoader showSpinner={false} />
        </div>
    )
}
