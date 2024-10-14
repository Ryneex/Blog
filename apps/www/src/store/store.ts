import { IPrivateUser } from "@/types/user"
import { proxy } from "valtio"

type store = {
    user: IPrivateUser | null
}

export const store = proxy<store>({
    user: null,
})
