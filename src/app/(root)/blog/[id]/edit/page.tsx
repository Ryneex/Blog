import { getCurrentUser } from "@/helpers/getCurrentUser"
import { client } from "@/lib/prismaClient"
import dynamic from "next/dynamic"
import { notFound, redirect } from "next/navigation"
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false })

export default async function page({ params: { id } }: { params: { [x: string]: string } }) {
    const { user } = await getCurrentUser()
    if (!user) return redirect("/")
    const blog = await client.blogs.findFirst({ where: { id, authorId: user.id } })
    if (!blog) return notFound()
    return (
        <div className="h-full overflow-auto">
            <Editor initialData={blog} />
        </div>
    )
}
