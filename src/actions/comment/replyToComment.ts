"use server"
import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"
import { replyValidation } from "@/validations/comment"

export async function replyToComment(body: { parentId: string; content: string }) {
    try {
        const { success, data } = replyValidation.safeParse(body)
        if (!success) return sendError("Invalid Request")
        const { content, parentId } = data

        const { user } = await auth.getCurrentUser()
        if (!user) return sendError("User not logged in")

        // Making sure that the comment exists to reply
        const parentComment = await client.comments.findFirst({ where: { id: parentId } })
        if (!parentComment) return sendError("Invalid Request")

        await client.comment_replies.create({ data: { parentId, userId: user.id, content } })
        return { success: true as true, message: "Your comment have been created" }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}
