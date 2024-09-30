"use server"
import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"

export async function deleteReply(replyId: string) {
    try {
        if (!replyId) return sendError("Invalid Request")
        const { user } = await auth.getCurrentUser()
        if (!user) return sendError("User not logged in")

        await client.comment_replies.delete({ where: { id: replyId, userId: user.id } })
        return { success: true as true, message: "Your reply have been deleted" }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}
