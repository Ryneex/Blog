import { user } from "@prisma/client"

export type IPublicUser = Pick<user, "id" | "name" | "avatar_url">
export type IPrivateUser = Pick<user, "id" | "name" | "email" | "avatar_url">
