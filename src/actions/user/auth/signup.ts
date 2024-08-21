"use server"

import { sendError } from "@/helpers/sendError"
import { client } from "@/lib/prismaClient"
import { ErrorResponse, SuccessResponse } from "@/types"
import { signupValidation } from "@/validations/user"
import { z } from "zod"
import argon from "argon2"
import { auth } from "@/lib/auth"
import { getSessionInfo } from "@/helpers/getSessionInfo"
import { headers } from "next/headers"

type IResponse = ErrorResponse | SuccessResponse<{ user: { id: string; name: string; email: string } }>

export async function signup(data: z.infer<typeof signupValidation>): Promise<IResponse> {
    const validate = signupValidation.safeParse(data)
    if (validate.error) return sendError("Bad Request")
    try {
        const hash = await argon.hash(validate.data.password)
        const user = await client.user.create({ data: { ...validate.data, password: hash }, select: { id: true, name: true, email: true } })
        // get location and device info
        const ip = headers().get("x-forwarded-for")!
        const info = getSessionInfo(ip)
        await auth.createSession({ userId: user.id, expiresAt: new Date(Date.now() + 2592000000), info, ip })
        return { success: true, user }
    } catch (error) {
        return sendError(error, (err) => {
            if ("code" in err && err.code === "P2002") {
                return "Email already exists"
            }
        })
    }
}
