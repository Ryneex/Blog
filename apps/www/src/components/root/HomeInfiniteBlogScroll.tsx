"use client"

import { getBlogsByQuery } from "@/actions/blog/getBlogsByQuery"
import BlogCard from "@/components/BlogCard"
import { IBlogCardInfo } from "@/types/blog"
import { Spinner } from "@nextui-org/react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function HomeInfiniteBlogScroll({ initialBlogs }: { initialBlogs: IBlogCardInfo[] }) {
    const query = useSearchParams().get("q")
    // the value `12` should be in sync with getBlogsByQuery functions `take` query variable.
    const [hasMore, setHasMore] = useState(initialBlogs.length === 12)
    const [blogs, setBlogs] = useState(initialBlogs)

    const refetch = async () => {
        const data = await getBlogsByQuery({ skip: blogs.length, query: query ?? undefined })
        if (data && data.length) return setBlogs((prev) => [...prev, ...data])
        setHasMore(false)
    }

    useEffect(() => {
        setBlogs(initialBlogs)
    }, [initialBlogs])

    return (
        <div>
            <div className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                {blogs.map((blog, i) => {
                    const isLastBlog = blogs.length === i + 1
                    return <BlogCard onSeen={isLastBlog && hasMore ? refetch : undefined} blog={blog} key={blog.id} />
                })}
            </div>
            <div className="grid h-40 place-items-center text-sm text-black/70">{hasMore ? <Spinner /> : "End Of Results"}</div>
        </div>
    )
}
