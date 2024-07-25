"use server"

import { sendError } from "@/helpers/sendError"
import { client } from "@/lib/prismaClient"
import { ErrorResponse, SuccessResponse } from "@/types"
import { signupValidation } from "@/validations/user"
import { z } from "zod"
import argon from "argon2"
import { auth } from "@/lib/auth"

type IResponse = ErrorResponse | SuccessResponse<{ user: typeof signupValidation._output }>

export async function signup(data: z.infer<typeof signupValidation>): Promise<IResponse> {
    const validate = signupValidation.safeParse(data)
    if (validate.error) return sendError("Bad Request")
    try {
        const hash = await argon.hash(validate.data.password)
        const user = await client.user.create({ data: { ...validate.data, password: hash } })
        await auth.createSession({ userId: user.id, expiresAt: new Date(Date.now() + 2592000000) })
        return { success: true, user }
    } catch (error) {
        return sendError(error, (err) => {
            if ("code" in err && err.code === "P2002") {
                return "Email already exists"
            }
        })
    }
}
