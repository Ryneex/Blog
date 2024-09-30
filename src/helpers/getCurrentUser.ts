import { auth } from "@/lib/auth"
import { cache } from "react"
import { ExcludeKeys } from "./excludeKeys"

// caching the function to use it in multiple components withouts refetching user info
export const getCurrentUser = cache(async () => {
    const res = await auth.getCurrentUser()
    if (res.success) return { success: true as const, user: { ...ExcludeKeys(res.user, ["password"]) } }
    return res
})
