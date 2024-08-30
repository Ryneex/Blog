"use client"

import { getBlogsByQuery } from "@/actions/blog/getBlogsByQuery"
import BlogCard from "@/components/BlogCard"
import { IBlogCardInfo } from "@/types/blog"
import { Spinner } from "@nextui-org/react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function HomeInfiniteBlogScroll({ initialBlogs }: { initialBlogs: IBlogCardInfo[] }) {
    const query = useSearchParams().get("q")
    const [hasMore, setHasMore] = useState(true)
    const { data, fetchNextPage } = useInfiniteQuery({
        queryKey: ["blogs", query],
        initialData: { pageParams: [0], pages: [initialBlogs] },
        enabled: false,
        queryFn: async ({ pageParam }) => {
            const blogs = await getBlogsByQuery({ skip: pageParam, query: query ?? undefined })
            if (blogs && blogs.length) return blogs
            setHasMore(false)
            return []
        },
        initialPageParam: 0,
        getNextPageParam: (_, allPages) => allPages.flat().length,
    })
    return (
        <div>
            <div className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                {data.pages.flat().map((blog, i) => {
                    const isLastBlog = data.pages.flat().length === i + 1
                    return <BlogCard onSeen={isLastBlog && hasMore ? fetchNextPage : undefined} blog={blog} key={blog.id} />
                })}
            </div>
            <div className="grid h-40 place-items-center text-sm text-black/70">{hasMore ? <Spinner /> : "End Of Results"}</div>
        </div>
    )
}
