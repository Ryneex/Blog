import { PrismaAdapter } from "authy-js/adapters/prisma"
import { NextHandler } from "authy-js/handlers/next"
import { client } from "./prismaClient"
import { session, user } from "@prisma/client"

const adapter = new PrismaAdapter({ Session: client.session, User: client.user })

export const auth = NextHandler<user, session>({ adapter })
