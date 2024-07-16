"use server"

import { sendError } from "@/helpers/sendError"
import { client } from "@/lib/prismaClient"
import { ErrorResponse, SuccessResponse } from "@/types"
import { signupValidation } from "@/validations/user"
import { z } from "zod"

type IResponse = ErrorResponse | SuccessResponse<{ user: typeof signupValidation._output }>

export async function signup(data: z.infer<typeof signupValidation>): Promise<IResponse> {
    try {
        const user = await client.user.create({ data })
        return { success: true, user }
    } catch (error) {
        return sendError(error, (err) => {
            if ("code" in err && err.code === "P2002") {
                return "Email already exists"
            }
        })
    }
}
