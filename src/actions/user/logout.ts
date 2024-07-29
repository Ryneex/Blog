"use server"

import { auth } from "@/lib/auth"
import { cookies } from "next/headers"

export async function logout() {
    await auth.deleteCurrentSession()
    cookies().delete("session_id")
    return { success: true }
}
