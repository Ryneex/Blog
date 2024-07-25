import { PrismaClient } from "@prisma/client"

declare global {
    var PClient: PrismaClient | undefined
}

export const client: PrismaClient = globalThis.PClient || (globalThis.PClient = new PrismaClient())