"use server"
import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"
import { commentValidation } from "@/validations/comment"

export async function comment(body: { blogId: string; content: string }) {
    try {
        const { success, data } = commentValidation.safeParse(body)
        if (!success) return sendError("Invalid Request")

        const { user } = await auth.getCurrentUser()
        if (!user) return sendError("User not logged in")

        const blogExists = await client.blogs.findFirst({ where: { id: data.blogId } })
        if (!blogExists) return sendError("Invalid Request")

        await client.comments.create({ data: { blogId: data.blogId, userId: user.id, content: data.content } })
        return { success: true as true, message: "Your comment have been created" }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}
