"use server"
import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"

export async function comment({ blogId, content }: { blogId: string; content: string }) {
    try {
        const { user } = await auth.getCurrentUser()
        if (!user) return sendError("User not logged in")
        await client.comments.create({ data: { blogId, userId: user.id, content } })
        return { success: true as true, message: "Your commend have been submitted" }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}
