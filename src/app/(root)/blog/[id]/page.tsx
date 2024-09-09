import { NotFound } from "@/components/NotFound"
import BlogComment from "@/components/root/blog/BlogComment"
import BlogPreview from "@/components/root/blog/BlogPreview"
import { getCurrentUser } from "@/helpers/getCurrentUser"
import { client } from "@/lib/prismaClient"
import { Suspense } from "react"

export default async function page({ params: { id } }: { params: { [x: string]: string } }) {
    const { user } = await getCurrentUser()
    const response = await client.blogs.findFirst({ where: { id }, include: { author: { select: { id: true, name: true, avatarUrl: true } }, likes: { where: { userId: user?.id } }, _count: true } })
    if (!response) return <NotFound />
    return (
        <div className="blogContainer h-full overflow-auto">
            <div className="container flex !max-w-4xl flex-col overflow-hidden rounded-md py-7">
                <BlogPreview data={response} />
                <Suspense fallback>
                    <BlogComment blogId={response.id} />
                </Suspense>
            </div>
        </div>
    )
}
