import { lookup } from "@/lib/maxmind"
import { headers } from "next/headers"
import { userAgent } from "next/server"

export function getSessionInfo(ip: string) {
    const ipInfo = lookup.get(ip)
    const location = ipInfo ? `${ipInfo.city?.names.en}, ${ipInfo.country?.iso_code}` : undefined
    const {
        browser: { name: browser, version: browser_version },
        os: { name: os },
    } = userAgent({ headers: headers() })
    return { os, browser, browser_version, location }
}
