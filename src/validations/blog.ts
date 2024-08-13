import { z } from "zod"

export const blogValidation = z.object({
    cover: z.custom<string | File>((e) => {
        const isUrl = z.string().url().trim().safeParse(e)
        if (isUrl.success) return isUrl.data
        if (e instanceof File) {
            if (["image/png", "image/jpg", "image/jpeg"].includes(e.type)) return e
        }
        return false
    }, "Invalid cover image"),
    title: z.string().trim().min(10, "title must be more than 10 chars").max(50, "title must be less than 50 chars"),
    description: z.string().trim().min(50, "description must be more than 10 chars").max(1000, "description must be less than 1000 chars"),
    content: z.string().refine((value) => {
        try {
            JSON.parse(value)
            return true
        } catch (error) {
            return false
        }
    }),
})

export const updateBlogValidation = z.object({
    id: z.string().trim(),
    cover: z.custom<string | File>((e) => {
        const isUrl = z.string().url().trim().safeParse(e)
        if (isUrl.success) return isUrl.data
        if (e instanceof File) {
            if (["image/png", "image/jpg", "image/jpeg"].includes(e.type)) return e
        }
        return false
    }, "Invalid cover image"),
    title: z.string().trim().min(10, "title must be more than 10 chars").max(50, "title must be less than 50 chars"),
    description: z.string().trim().min(50, "description must be more than 10 chars").max(1000, "description must be less than 1000 chars"),
    content: z.string().refine((value) => {
        try {
            JSON.parse(value)
            return true
        } catch (error) {
            return false
        }
    }),
})
