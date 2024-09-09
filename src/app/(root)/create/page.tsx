import BlogEditor from "@/components/editor/BlogEditor"
import { getCurrentUser } from "@/helpers/getCurrentUser"
import { redirect } from "next/navigation"

export default async function Page() {
    const res = await getCurrentUser()
    if (!res.success) return redirect("/")
    return (
        <div className="h-full overflow-auto">
            <BlogEditor />
        </div>
    )
}
