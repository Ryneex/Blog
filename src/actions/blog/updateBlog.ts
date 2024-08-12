"use server"

import { getCoverUrl } from "@/helpers/getCoverUrl"
import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"
import { updateBlogValidation } from "@/validations/blog"

export async function updateBlog(formData: FormData) {
    try {
        const data = Object.fromEntries(formData.entries())
        const validate = updateBlogValidation.safeParse(data)
        if (!validate.success) return sendError("Bad Request")
        const res = await auth.getCurrentUser()
        if (!res.success) return sendError("Bad Request")
        const { id, title, description, content, cover } = validate.data
        const existingBlog = await client.blog.findFirst({ where: { id, author_id: res.user.id }, select: { author_id: true } })
        if (!existingBlog) return sendError("Post not found")
        const coverResponse = await getCoverUrl(cover, id)
        if (!coverResponse.success) return sendError(coverResponse.message)
        const blog = await client.blog.update({ where: { id }, data: { title, description, content, cover_url: coverResponse.url } })
        return { success: true, blog }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}
