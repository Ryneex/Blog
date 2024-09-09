"use server"

import { getCoverUrl } from "@/helpers/getCoverUrl"
import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"
import { updateBlogValidation } from "@/validations/blog"
import markdownToTxt from "markdown-to-txt"

export async function updateBlog(formData: FormData) {
    try {
        const data = Object.fromEntries(formData.entries())
        const validate = updateBlogValidation.safeParse(data)
        if (!validate.success) return sendError("Bad Request")
        const res = await auth.getCurrentUser()
        if (!res.success) return sendError("Bad Request")
        const { id, title, content, cover } = validate.data

        // Creating small description from markdown content
        const description = markdownToTxt(validate.data.content).substring(0, 200)

        const existingBlog = await client.blogs.findFirst({ where: { id, authorId: res.user.id }, select: { authorId: true } })
        if (!existingBlog) return sendError("Post not found")
        const coverResponse = await getCoverUrl(cover, id)
        if (!coverResponse.success) return sendError(coverResponse.message)
        const blog = await client.blogs.update({ where: { id }, data: { title, description, content, coverUrl: coverResponse.url } })
        return { success: true, blog }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}
