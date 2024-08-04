import { IPrivateUser } from "@/types/user"
import { proxy } from "valtio"

type store = {
    user?: IPrivateUser
}

export const store = proxy<store>({
    user: undefined,
})
