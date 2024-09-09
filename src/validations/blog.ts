import { z } from "zod"

const validation = {
    cover: z.custom<string | File>((e) => {
        const isUrl = z.string().url().trim().safeParse(e)
        if (isUrl.success) return isUrl.data
        if (e instanceof File) {
            if (["image/png", "image/jpg", "image/jpeg"].includes(e.type)) return e
        }
        return false
    }, "Invalid cover image"),
    title: z.string().trim().min(10, "title must be more than 10 chars").max(100, "title must be less than 100 chars"),
    content: z.string(),
}

export const blogValidation = z.object(validation)

export const updateBlogValidation = z.object({
    id: z.string().trim(),
    ...validation,
})
