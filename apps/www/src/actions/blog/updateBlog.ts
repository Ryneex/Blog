"use server"

import { generateBlogDescription } from "@/helpers/generateBlogDescription"
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
        const { id, title, content, cover } = validate.data

        // Creating small description from editor content
        const description = generateBlogDescription(content)

        const existingBlog = await client.blogs.findFirst({ where: { id, authorId: res.user.id }, select: { authorId: true, coverUrl: true } })
        if (!existingBlog) return sendError("Post couldn't be found")
        const coverResponse = await getCoverUrl(cover, id, existingBlog.coverUrl)
        if (!coverResponse.success) return sendError(coverResponse.message)
        const blog = await client.blogs.update({ where: { id }, data: { title, description, content, coverUrl: coverResponse.url } })
        return { success: true, blog }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}
