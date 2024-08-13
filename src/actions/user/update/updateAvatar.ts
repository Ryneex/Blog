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
        const userResponse = await auth.getCurrentUser()
        if (!userResponse.success) return sendError("Bad Request")
        const uploadResponse: ITypeUploadResponse = await new Promise(async (res) => {
            const stream = cloudinary.v2.uploader.upload_stream({ resource_type: "image", folder: "/blog/avatar", public_id: userResponse.user.id }, (err, data) => {
                if (err) return res(sendError(err.message))
                if (data) return res({ success: true, url: data.secure_url })
                res(sendError("something went wrong"))
            })
            stream.end(Buffer.from(await validate.data.arrayBuffer()))
        })
        if (!uploadResponse.success) return uploadResponse
        await client.user.update({ where: { id: userResponse.user.id }, data: { avatar_url: uploadResponse.url } })
        return { success: true as const, message: "Avatar updated" }
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
