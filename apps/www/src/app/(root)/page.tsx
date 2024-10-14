import { getBlogsByQuery } from "@/actions/blog/getBlogsByQuery"
import ErrorComponent from "@/components/ErrorComponent"
import { NotFound } from "@/components/NotFound"
import HomeInfiniteBlogScroll from "@/components/root/HomeInfiniteBlogScroll"
import SearchBar from "@/components/root/SearchBar"

export default async function page({ searchParams }: { searchParams: { [x: string]: string | undefined } }) {
    const blogs = await getBlogsByQuery({ skip: 0, query: searchParams.q })
    return (
        <div className="h-full overflow-auto">
            <div className="container flex h-full flex-col">
                <div className="flex shrink-0 items-center justify-between gap-2 pt-3 sm:pt-5">
                    <h1 className="hidden text-center text-2xl font-bold text-black/80 sm:block">Blogs</h1>
                    <SearchBar />
                </div>
                {blogs ? (
                    blogs.length ? (
                        <HomeInfiniteBlogScroll initialBlogs={blogs ?? []} />
                    ) : (
                        <NotFound title="Blogs not found" description="The blogs you're looking for isn't found, search something else" />
                    )
                ) : (
                    <ErrorComponent error="Couldn't get blogs" />
                )}
            </div>
        </div>
    )
}
