"use server"

import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"

export async function likeBlog(blogId: string) {
    try {
        if (!blogId) return sendError("Invalid Request")
        const { user } = await auth.getCurrentUser()
        if (!user) return sendError("User not logged In")

        const blogExists = await client.blogs.findFirst({ where: { id: blogId } })
        if (!blogExists) return sendError("Invalid Request")

        // deleting like if it already exists
        const likeExists = await client.likes.findFirst({ where: { blogId, userId: user.id } })
        if (likeExists) {
            await client.likes.deleteMany({ where: { blogId, userId: user.id } })
            return { success: true, message: "Like has been removed from blog" }
        }
        await client.likes.create({ data: { blogId, userId: user.id } })
        return { success: true, message: "Blog has been liked" }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}
