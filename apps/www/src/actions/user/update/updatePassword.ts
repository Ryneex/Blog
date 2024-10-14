"use server"

import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"
import { updatePasswordValidation } from "@/validations/user"
import argon from "argon2"
import { z } from "zod"

export async function updatePassword(data: z.infer<typeof updatePasswordValidation>) {
    try {
        const validate = updatePasswordValidation.safeParse(data)
        if (!validate.success) return sendError("Bad Request")
        const { user } = await auth.getCurrentUser()
        if (!user) return sendError("Bad Request")

        // let him set a password if he logged in using other methods
        if (!user.password) {
            const hash = await argon.hash(validate.data.newPassword)
            await client.users.update({ where: { id: user.id }, data: { password: hash } })
            return { success: true as const, message: "Password has been created" }
        }

        const passwordMatched = await argon.verify(user.password, validate.data.currentPassword)
        if (!passwordMatched) return sendError("Incorrect password")

        const hash = await argon.hash(validate.data.newPassword)
        await client.users.update({ where: { id: user.id }, data: { password: hash } })
        return { success: true as const, message: "Password has been updated" }
    } catch (error) {
        return sendError("Something wen't wrong")
    }
}
