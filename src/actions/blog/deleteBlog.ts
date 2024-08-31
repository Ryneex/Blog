"use server"

import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { cloudinary } from "@/lib/cloudinary"
import { client } from "@/lib/prismaClient"

export async function deleteBlog(id: string) {
    try {
        if (!id) return sendError("Id is required")
        const res = await auth.getCurrentUser()
        if (!res.success) return sendError("Unauthorized")
        await client.blogs.delete({ where: { id, authorId: res.user.id } })
        await cloudinary.v2.uploader.destroy(`blog/cover/${id}`)
        return { success: true as true, message: "Blog has been deleted" }
    } catch (error) {
        return sendError("Cloudn't delete blog")
    }
}
