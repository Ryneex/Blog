"use client"

import { useEffect } from "react"

/**
 * This component checks for hash in the url and scrolls to the element
 * that uses that hash as ID. isn't that cool
 */
export default function ScrollToComment() {
    useEffect(() => {
        const id = window.location.hash.slice(1)
        const element = document.getElementById(id)
        if (element) element.scrollIntoView({ behavior: "smooth" })
    }, [])

    return null
}
