import { client } from "@/lib/prismaClient"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
const BlogPreview = dynamic(() => import("./BlogPreview"), { ssr: false })

export default async function page({ params: { id } }: { params: { [x: string]: string } }) {
    const response = await client.blog.findFirst({ where: { id } })
    if (!response) return notFound()
    return (
        <div className="h-full overflow-auto">
            <BlogPreview data={response} />
        </div>
    )
}
