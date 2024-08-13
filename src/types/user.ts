import { user } from "@prisma/client"

export type IBaseUser = Pick<user, "id" | "name" | "avatar_url">
export type IPublicUser = IBaseUser & Pick<user, "bio">
export type IPrivateUser = IBaseUser & Pick<user, "email" | "bio">
