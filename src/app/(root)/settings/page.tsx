import AccountSettings from "@/components/root/settings/AccountSettings"
import DeleteAccount from "@/components/root/settings/DeleteAccount"
import UpdatePassword from "@/components/root/settings/UpdatePassword"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function page() {
    const { user } = await auth.getCurrentUser()
    if (!user) return redirect("/")

    const { name, email, bio, avatarUrl, password } = user

    return (
        <div className="w-full ~py-2/5">
            <AccountSettings userData={{ name, email, bio, avatarUrl }} />
            <hr className="my-6" />
            <UpdatePassword hasPassword={!!password} />
            <hr className="my-10" />
            <DeleteAccount hasPassword={!!password} />
        </div>
    )
}
