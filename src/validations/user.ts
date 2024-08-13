import { z } from "zod"

export const signinValidation = z.object({
    email: z.string().toLowerCase().trim().email(),
    password: z.string().toLowerCase().trim().min(5).max(100),
})

export const signupValidation = z.object({
    name: z.string().trim().min(5).max(100),
    email: z.string().toLowerCase().trim().email(),
    password: z.string().min(5).max(100),
})

export const updateUserValidation = z.object({
    name: z.string().trim().min(5).max(100),
    bio: z.string().trim().min(10).max(200).nullable(),
})
