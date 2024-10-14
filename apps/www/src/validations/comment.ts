import { z } from "zod"

export const commentValidation = z.object({ blogId: z.string(), content: z.string().min(1).max(1000) })
export const replyValidation = z.object({ parentId: z.string(), content: z.string().min(1).max(1000) })
