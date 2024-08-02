import { client } from "@/lib/prismaClient"
import Link from "next/link"
import { DateTime } from "luxon"

export default async function Page() {
    const response = await client.blog.findMany({ include: { author: { select: { name: true } } } })
    return (
        <div className="overflow-auto">
            <h1 className="pt-7 text-center font-bold text-black/80 fluid-text-xl">Recent Blogs</h1>
            <div className="grid gap-5 p-3 sm:grid-cols-2 sm:p-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {response.map((blog, i) => (
                    <div key={i} className="flex flex-col rounded-lg border bg-white shadow-sm">
                        <Link href={`/blog/${blog.id}`} className="aspect-video w-full overflow-hidden rounded-lg">
                            <img className="h-full w-full object-cover duration-300 hover:scale-110" src={blog.cover_url} alt="" />
                        </Link>
                        <div className="space-y-2 p-3 text-black/80 sm:p-5">
                            <span className="text-xs font-medium text-black/60">
                                {blog.author.name} | {DateTime.fromJSDate(blog.createdAt).toFormat("dd LLL yyyy")}
                            </span>
                            <Link href={`/blog/${blog.id}`} className="block truncate font-semibold text-blue-700 fluid-text-base">
                                {blog.title}
                            </Link>
                            <p className="line-clamp-3 text-sm text-black/70">{blog.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
