import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"
import LayoutProvider from "@/components/LayoutProvider"

const roboto = Roboto({ weight: ["100", "300", "400", "500", "700", "900"], subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Blogy",
    description: "A full featured blog application",
}

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <LayoutProvider>{children}</LayoutProvider>
            </body>
        </html>
    )
}
