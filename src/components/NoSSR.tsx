"use client"

import { useEffect, useState } from "react"

export default function NoSSR({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return isClient ? children : fallback
}
