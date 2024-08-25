import AccountSettings from "@/components/root/settings/AccountSettings"
import { getCurrentUser } from "@/helpers/getCurrentUser"

export default async function page() {
    const { user } = await getCurrentUser()
    if (!user) return
    return <AccountSettings userData={user} />
}
