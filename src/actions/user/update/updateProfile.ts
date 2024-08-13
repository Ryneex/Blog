"use server"

import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"
import { updateUserValidation } from "@/validations/user"
import { z } from "zod"

export async function updateProfile(data: z.infer<typeof updateUserValidation>) {
    try {
        const validate = updateUserValidation.safeParse(data)
        if (!validate.success) return sendError("Bad Request")
        const res = await auth.getCurrentUser()
        if (!res.success) return sendError("Bad Request")
        await client.user.update({ where: { id: res.user.id }, data: validate.data })
        return { success: true as const, message: "Profile updated" }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}
