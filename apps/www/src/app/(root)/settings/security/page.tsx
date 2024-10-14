import SecuritySettings from "@/components/root/settings/SecuritySettings"
import { ExcludeKeys } from "@/helpers/excludeKeys"
import { getCurrentUser } from "@/helpers/getCurrentUser"
import { client } from "@/lib/prismaClient"
import { cookies } from "next/headers"

export default async function page() {
    const { user } = await getCurrentUser()
    if (!user) return
    const sessions = await client.sessions.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } })
    const currentSessionId = cookies().get("session_id")!.value
    const filteredSession = sessions.map((e) => ({ ...ExcludeKeys(e, ["id"]), isCurrent: e.id === currentSessionId }))
    return <SecuritySettings sessions={filteredSession} />
}
