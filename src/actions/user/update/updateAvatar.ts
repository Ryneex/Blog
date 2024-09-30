"use server"

import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { cloudinary } from "@/lib/cloudinary"
import { client } from "@/lib/prismaClient"
import { ErrorResponse, SuccessResponse } from "@/types"
import { z } from "zod"

type ITypeUploadResponse = ErrorResponse | SuccessResponse<{ url: string }>

export async function updateAvatar(formData: FormData) {
    try {
        const image = formData.get("image")
        const validate = imageValidator.safeParse(image)
        if (!validate.success) return sendError("Bad Request")
        const { user } = await auth.getCurrentUser()
        if (!user) return sendError("Bad Request")

        // upload the new avatar to cloudinary
        const uploadResponse: ITypeUploadResponse = await new Promise(async (res) => {
            const stream = cloudinary.v2.uploader.upload_stream({ resource_type: "image", folder: "/blogApp/profileAvatar", public_id: user.id }, (err, data) => {
                if (err) return res(sendError(err.message))
                if (data) return res({ success: true, url: data.secure_url })
                res(sendError("Something went wrong"))
            })
            stream.end(Buffer.from(await validate.data.arrayBuffer()))
        })

        if (!uploadResponse.success) return uploadResponse
        await client.users.update({ where: { id: user.id }, data: { avatarUrl: uploadResponse.url } })
        return { success: true as const, message: "Avatar has been updated" }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}

const imageValidator = z.custom<File>((e) => {
    if (e instanceof File) {
        if (["image/png", "image/jpg", "image/jpeg"].includes(e.type)) return e
    }
    return false
})
