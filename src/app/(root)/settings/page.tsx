import AccountSettings from "@/components/root/settings/AccountSettings"
import { getCurrentUser } from "@/helpers/getCurrentUser"
import { SelectKeys } from "@/helpers/selectKeys"
import { redirect } from "next/navigation"

export default async function page() {
    const res = await getCurrentUser()
    if (!res.success) redirect("/")
    return <AccountSettings userData={SelectKeys(res.user, ["id", "name", "email", "avatar_url", "bio"])} />
}
