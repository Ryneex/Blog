import { getCurrentUser } from "@/helpers/getCurrentUser"
import { client } from "@/lib/prismaClient"
import dynamic from "next/dynamic"
import { notFound, redirect } from "next/navigation"
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false })

export default async function page({ params: { id } }: { params: { [x: string]: string } }) {
    const userResponse = await getCurrentUser()
    if (!userResponse.success) return redirect("/")
    const blog = await client.blog.findFirst({ where: { id } })
    if (blog?.author_id !== userResponse.user.id) return notFound()
    return (
        <div className="h-full overflow-auto">
            <Editor initialData={blog} />
        </div>
    )
}
