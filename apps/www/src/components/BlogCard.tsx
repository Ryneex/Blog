"use client"

import { IBlogCardInfo } from "@/types/blog"
import { DateTime } from "luxon"
import Link from "next/link"
import { useEffect, useRef } from "react"
import NoSSR from "./NoSSR"
import { Skeleton } from "@nextui-org/react"

type IProp = {
    blog: IBlogCardInfo
    onSeen?: () => void
}
export default function BlogCard({ blog, onSeen }: IProp) {
    const blogRef = useRef<HTMLDivElement>(null)

    // callback function is called when blog is visible on screen
    useEffect(() => {
        const blogDiv = blogRef.current
        if (!onSeen || !blogDiv) return
        const observer = new IntersectionObserver((entries) => entries[0].isIntersecting && onSeen())
        observer.observe(blogRef.current)

        return () => observer.unobserve(blogDiv)
    }, [onSeen])

    return (
        <div ref={blogRef} className="flex flex-col rounded-lg border bg-white shadow-sm">
            <Link href={`/blog/${blog.id}`} className="aspect-video w-full overflow-hidden rounded-lg">
                <img className="h-full w-full object-cover duration-300 hover:scale-110" src={blog.coverUrl} alt="" />
            </Link>
            <div className="p-3 !pt-2 text-black/80 sm:p-5">
                <Link href={`/user/${blog.author.id}`} className="flex items-center gap-1 text-xs font-medium text-black/60">
                    <span className="underline">{blog.author.name}</span>
                    <span> - </span>
                    <NoSSR fallback={<Skeleton className="h-3 w-20 rounded-md" />}>
                        <time>{DateTime.fromJSDate(blog.createdAt).toFormat("dd LLL yyyy")}</time>
                    </NoSSR>
                </Link>
                <Link href={`/blog/${blog.id}`} className="mb-1 mt-2 block truncate font-semibold text-blue-700 ~text-lg/xl">
                    {blog.title}
                </Link>
                <p className="line-clamp-3 text-sm text-black/70">{blog.description}</p>
            </div>
        </div>
    )
}
