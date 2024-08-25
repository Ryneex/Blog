import AccountSettings from "@/components/root/settings/AccountSettings"
import { ExcludeKeys } from "@/helpers/excludeKeys"
import { getCurrentUser } from "@/helpers/getCurrentUser"

export default async function page() {
    const { user } = await getCurrentUser()
    if (!user) return
    return <AccountSettings userData={ExcludeKeys(user!, ["password"])} />
}
