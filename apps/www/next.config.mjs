import withPNR from "preload-next-routes"

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["shiki"],
    },
}

export default withPNR(nextConfig)
