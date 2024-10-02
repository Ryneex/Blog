import BlogEditor from "@/components/editor/BlogEditor"
import { getCurrentUser } from "@/helpers/getCurrentUser"
import { client } from "@/lib/prismaClient"
import { notFound, redirect } from "next/navigation"

export default async function page({ params: { id } }: { params: { [x: string]: string } }) {
    const { user } = await getCurrentUser()
    if (!user) return redirect("/")
    const blog = await client.blogs.findFirst({ where: { id, authorId: user.id } })
    if (!blog) return notFound()
    return <BlogEditor initialData={blog} />
}
