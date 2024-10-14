"use server"

import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { cloudinary } from "@/lib/cloudinary"
import { client } from "@/lib/prismaClient"
import { passwordValidation } from "@/validations/user"
import argon from "argon2"

export async function deleteAccount(password: string) {
    try {
        const validate = passwordValidation.safeParse(password)
        if (!validate) return sendError("Bad Request")
        const { user } = await auth.getCurrentUser()
        if (!user) return sendError("Bad Request")

        if (!user.password) {
            await deleteImagesFromCloudinary(user.id)
            await client.users.delete({ where: { id: user.id } })
            return { success: true as const, message: "Account has been Deleted" }
        }

        const doesPasswordMatch = await argon.verify(user.password, password)
        if (!doesPasswordMatch) return sendError("Password is incorrect")

        await deleteImagesFromCloudinary(user.id)
        await client.users.delete({ where: { id: user.id } })
        return { success: true as const, message: "Account has been Deleted" }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}

/**
 * This function will delete all the blogs cover images and avatar image accociated with the user
 */
async function deleteImagesFromCloudinary(userId: string) {
    // store all the blogs coudinary coverId in an array
    const blogs = await client.blogs.findMany({ where: { authorId: userId }, select: { coverUrl: true, id: true } })
    const blogImageIds = blogs.map((blog) => (blog.coverUrl.includes("res.cloudinary.com") ? "blogApp/blogCover/" + blog.id : undefined))
    const cloudinaryIds = blogImageIds.filter((e) => e !== undefined)

    // add avatarId to be deleted
    cloudinaryIds.push("blogApp/profileAvatar/" + userId)

    await cloudinary.v2.api.delete_resources(cloudinaryIds)
}
