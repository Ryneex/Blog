import { PrismaAdapter } from "authy-js/adapters/prisma"
import { NextHandler } from "authy-js/handlers/next"
import { client } from "./prismaClient"
import { sessions, users } from "@prisma/client"

const adapter = new PrismaAdapter({ Session: client.sessions, User: client.users })

export const auth = NextHandler<users, sessions>({ adapter, cookie: { options: { expires: "30d" } } })
