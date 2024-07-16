import { z } from "zod"

export const signinValidation = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(100),
})

export const signupValidation = z.object({
    name: z.string().min(5).max(100),
    email: z.string().email(),
    password: z.string().min(5).max(100),
})
