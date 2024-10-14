"use server"

import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"

export async function deleteOtherSessions() {
    try {
        const { session } = await auth.getCurrentSession()
        if (!session) return sendError()
        await client.sessions.deleteMany({ where: { userId: session.userId, NOT: [{ id: session.id }] } })
        return { success: true }
    } catch (error) {
        return sendError()
    }
}
