"use client"

import { getBlogsByUserId } from "@/actions/blog/getBlogsByUserId"
import BlogCard from "@/components/BlogCard"
import { IBlogCardInfo } from "@/types/blog"
import { Spinner } from "@nextui-org/react"
import { useState } from "react"

export default function ProfileInfiniteBlogScroll({ initialData, userId }: { initialData: IBlogCardInfo[]; userId: string }) {
    const [blogs, setBlogs] = useState(initialData)
    // the value `12` should be in sync with getBlogByUserId functions `take` query variable.
    const [hasMore, setHasMore] = useState(initialData.length === 12)

    async function refetch() {
        const data = await getBlogsByUserId({ skip: blogs.length, userId: userId })
        if (data && data.length) return setBlogs((prev) => [...prev, ...data])
        setHasMore(false)
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {blogs.map((blog, i) => {
                    const isLastBlog = blogs.length === i + 1
                    return <BlogCard onSeen={isLastBlog && hasMore ? refetch : undefined} blog={blog} key={blog.id} />
                })}
            </div>
            <div className="grid h-20 place-items-center text-sm text-black/70">{hasMore ? <Spinner /> : "End Of Results"}</div>
        </div>
    )
}
