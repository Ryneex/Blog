import { auth } from "@/lib/auth"
import { cache } from "react"

// caching the function to use it in multiple components withouts refetching user info
export const getCurrentUser = cache(auth.getCurrentUser)
