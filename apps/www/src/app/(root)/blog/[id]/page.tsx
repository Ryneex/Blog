import { NotFound } from "@/components/NotFound"
import BlogComments from "@/components/root/blog/BlogComments"
import BlogPreview from "@/components/root/blog/BlogPreview"
import { ExcludeKeys } from "@/helpers/excludeKeys"
import { getCurrentUser } from "@/helpers/getCurrentUser"
import { client } from "@/lib/prismaClient"
import { Suspense } from "react"

export default async function page({ params: { id } }: { params: { [x: string]: string } }) {
    const { user } = await getCurrentUser()
    const response = await client.blogs.findFirst({
        where: { id },
        include: {
            author: { select: { id: true, name: true, avatarUrl: true } },
            _count: { select: { comments: true, likes: true } },
            likes: !!user && { where: { userId: user.id } },
        },
    })
    if (!response) return <NotFound />
    const finalResponse = { ...ExcludeKeys(response, ["likes"]), isLiked: !!response.likes && !!response.likes[0] }

    return (
        <div className="blogContainer h-full overflow-auto">
            <div className="container flex !max-w-4xl flex-col overflow-hidden rounded-md py-7">
                <BlogPreview data={finalResponse} />
                <Suspense fallback>
                    <BlogComments blogId={finalResponse.id} />
                </Suspense>
            </div>
        </div>
    )
}
