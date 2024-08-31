import { NotFound } from "@/components/NotFound"
import { client } from "@/lib/prismaClient"
import dynamic from "next/dynamic"
const BlogPreview = dynamic(() => import("@/components/root/blog/BlogPreview"), { ssr: false })

export default async function page({ params: { id } }: { params: { [x: string]: string } }) {
    const response = await client.blogs.findFirst({ where: { id }, include: { author: { select: { id: true, name: true, avatarUrl: true } } } })
    if (!response) return <NotFound />
    return (
        <div className="h-full overflow-auto">
            <BlogPreview data={response} />
        </div>
    )
}
