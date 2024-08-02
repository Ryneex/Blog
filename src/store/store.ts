import { user } from "@prisma/client"
import { proxy } from "valtio"

type store = {
    user: Partial<Pick<user, "id" | "name" | "email" | "avatar_url">>
}

export const store = proxy<store>({
    user: {},
})
