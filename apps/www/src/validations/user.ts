import { z } from "zod"

export const passwordValidation = z.string().min(6).max(100)

export const signinValidation = z.object({
    email: z.string().toLowerCase().trim().email(),
    password: passwordValidation,
})

export const signupValidation = z.object({
    name: z.string().trim().min(5).max(100),
    email: z.string().toLowerCase().trim().email(),
    password: passwordValidation,
})

export const updateUserValidation = z.object({
    name: z.string().trim().min(5).max(100),
    bio: z.string().trim().min(10).max(200).nullable(),
})

export const updatePasswordValidation = z.object({ currentPassword: passwordValidation, newPassword: passwordValidation })
