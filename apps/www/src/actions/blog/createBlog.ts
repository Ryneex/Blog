"use server"

import { getCoverUrl } from "@/helpers/getCoverUrl"
import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"
import { blogValidation } from "@/validations/blog"
import { createId } from "@paralleldrive/cuid2"
import { markdownToTxt } from "markdown-to-txt"

export async function createBlog(formData: FormData) {
    try {
        const data = Object.fromEntries(formData.entries())
        const validate = blogValidation.safeParse(data)
        if (!validate.success) return sendError("Bad Request")
        const res = await auth.getCurrentUser()
        if (!res.success) return sendError("Bad Request")
        const { title, content, cover } = validate.data

        // Creating small description from markdown content
        const description = markdownToTxt(validate.data.content).substring(0, 200)

        const blogId = createId()
        const coverResponse = await getCoverUrl(cover, blogId)
        if (!coverResponse.success) return sendError(coverResponse.message)
        const blog = await client.blogs.create({ data: { id: blogId, title, description, content, coverUrl: coverResponse.url, authorId: res.user.id } })
        return { success: true, blog }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}
