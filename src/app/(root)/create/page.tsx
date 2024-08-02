import { getCurrentUser } from "@/helpers/getCurrentUser"
import dynamic from "next/dynamic"
import { redirect } from "next/navigation"
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false })

export default async function Page() {
    const res = await getCurrentUser()
    if (!res.success) return redirect("/")
    return (
        <div className="h-full overflow-auto">
            <Editor />
        </div>
    )
}
