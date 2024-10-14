import { headers } from "next/headers"
import { userAgent } from "next/server"

/**
 * Maxminds IP database doesn't work with vercel. So location detection feature is turned off. 😭
 */
export function getSessionInfo(ip: string) {
    // const ipInfo = lookup.get(ip)
    // const location = ipInfo ? `${ipInfo.city?.names.en}, ${ipInfo.country?.iso_code}` : undefined

    const location = ip ? undefined : undefined
    const {
        browser: { name: browser, version: browser_version },
        os: { name: os },
    } = userAgent({ headers: headers() })
    return { os, browser, browserVersion: browser_version, location }
}
