import { blogs, users } from "@prisma/client"

export type IBlogCardInfo = Pick<blogs, "id" | "title" | "description" | "coverUrl" | "createdAt"> & { author: Pick<users, "id" | "name"> }
