"use server"
import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"

export async function deleteComment(commentId: string) {
    try {
        const { user } = await auth.getCurrentUser()
        if (!user) return sendError("User not logged in")
        await client.comments.delete({ where: { id: commentId, userId: user.id } })
        return { success: true as true, message: "Your comment have been deleted" }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}
