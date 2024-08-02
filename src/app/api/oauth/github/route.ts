import { sendError } from "@/helpers/sendError"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prismaClient"
import { NextRequest } from "next/server"
import { Octokit, OAuthApp } from "octokit"

const oauthApp = new OAuthApp({ clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! })

export async function GET(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get("code")
        if (!code) return Response.json(sendError("Code not present"))
        const token = await oauthApp.createToken({ code })
        const octokit = new Octokit({ auth: token.authentication.token })
        const { data: emailData } = await octokit.rest.users.listEmailsForAuthenticatedUser()
        const [{ email }] = emailData
        const userWithEmail = await client.user.findFirst({ where: { email } })
        if (userWithEmail) {
            await auth.createSession({ userId: userWithEmail.id, expiresAt: new Date(Date.now() + 2592000000) })
            return Response.redirect(req.nextUrl.origin)
        }
        const { data } = await octokit.rest.users.getAuthenticated()
        const { login, avatar_url } = data
        const createdUser = await client.user.create({ data: { email, name: login, avatar_url } })
        await auth.createSession({ userId: createdUser.id, expiresAt: new Date(Date.now() + 2592000000) })
        return Response.redirect(req.nextUrl.origin)
    } catch (error) {
        return new Response("Bad Request", { status: 400 })
    }
}
