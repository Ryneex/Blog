"use client"

import { store } from "@/store/store"
import { user } from "@prisma/client"
import { useEffect } from "react"
import ErrorComponent from "../ErrorComponent"
import { ErrorBoundary } from "react-error-boundary"

export default function RootLayoutProvider({ children, user }: { children: React.ReactNode; user: Omit<user, "password"> | null }) {
    useEffect(() => {
        store.user = user
    }, [user])

    return <ErrorBoundary FallbackComponent={ErrorComponent}>{children}</ErrorBoundary>
}
