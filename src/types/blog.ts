import { blog, user } from "@prisma/client";

export type IBlogCardInfo = Pick<blog, "id" | "title" | "description" | "cover_url" | "createdAt"> & { author: Pick<user, "id" | "name"> }