import { users } from "@prisma/client"

export type IBaseUser = Pick<users, "id" | "name" | "avatarUrl">
export type IPublicUser = IBaseUser & Pick<users, "bio">
export type IPrivateUser = IBaseUser & Pick<users, "email" | "bio">
