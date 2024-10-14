import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function layout({ children }: { children: React.ReactNode }) {
    if ((await auth.getCurrentUser()).success) return redirect("/")
    return children
}
