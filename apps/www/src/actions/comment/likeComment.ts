"use server"

import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"

export async function likeComment(commentId: string) {
    try {
        if (!commentId) return sendError("Invalid Request")
        const { user } = await auth.getCurrentUser()
        if (!user) return sendError("User not logged In")

        const commentExists = await client.comments.findFirst({ where: { id: commentId } })
        if (!commentExists) return sendError("Invalid Request")

        // deleting like if it already exists
        const likeExists = await client.comment_likes.findFirst({ where: { commentId, userId: user.id } })
        if (likeExists) {
            await client.comment_likes.deleteMany({ where: { commentId, userId: user.id } })
            return { success: true, message: "Like has been removed from comment" }
        }
        await client.comment_likes.create({ data: { commentId, userId: user.id } })
        return { success: true, message: "Comment has been liked" }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}
