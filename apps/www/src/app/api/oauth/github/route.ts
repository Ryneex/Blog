import { getSessionInfo } from "@/helpers/getSessionInfo"
import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"
import { headers } from "next/headers"
import { NextRequest } from "next/server"
import { Octokit, OAuthApp } from "octokit"

const oauthApp = new OAuthApp({ clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! })

export async function GET(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get("code")
        if (!code) return Response.json(sendError("Code is Required"))
        const token = await oauthApp.createToken({ code })
        const octokit = new Octokit({ auth: token.authentication.token })
        // Get the users primary email
        const { data: emailData } = await octokit.rest.users.listEmailsForAuthenticatedUser()
        const [{ email }] = emailData
        // get location and device info
        const ip = headers().get("x-forwarded-for")!
        const info = getSessionInfo(ip)
        // Check if user with this email is already registered
        const userWithEmail = await client.users.findFirst({ where: { email } })
        if (userWithEmail) {
            await auth.createSession({ userId: userWithEmail.id, expiresAt: new Date(Date.now() + 2592000000), info, ip })
            return Response.redirect(req.nextUrl.origin)
        }
        // Register new User if he's already not registered
        const { data } = await octokit.rest.users.getAuthenticated()
        const { login, avatar_url } = data
        const createdUser = await client.users.create({ data: { email, name: login, avatarUrl: avatar_url } })
        await auth.createSession({ userId: createdUser.id, expiresAt: new Date(Date.now() + 2592000000), info, ip })
        return Response.redirect(req.nextUrl.origin)
    } catch (error) {
        return new Response("Bad Request", { status: 400 })
    }
}
