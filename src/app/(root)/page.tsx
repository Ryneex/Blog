import { client } from "@/lib/prismaClient"
import Link from "next/link"
import { DateTime } from "luxon"
import SearchBar from "@/components/root/SearchBar"
import { NotFound } from "@/components/NotFound"
import { blog, user } from "@prisma/client"

export default async function Page({ searchParams }: { searchParams: { [x: string]: string | undefined } }) {
    const response = await getPostsByQuery(searchParams.q)
    return (
        <div className="h-full overflow-auto">
            <div className="container flex h-full flex-col">
                <div className="flex shrink-0 flex-col items-center justify-between gap-2 pt-3 sm:flex-row sm:pt-5">
                    <h1 className="order-1 text-center font-bold text-black/80 fluid-text-xl sm:-order-1">Blogs</h1>
                    <SearchBar />
                </div>
                {response.length ? (
                    <div className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                        {response.map((blog, i) => (
                            <div key={i} className="flex flex-col rounded-lg border bg-white shadow-sm">
                                <Link href={`/blog/${blog.id}`} className="aspect-video w-full overflow-hidden rounded-lg">
                                    <img className="h-full w-full object-cover duration-300 hover:scale-110" src={blog.cover_url} alt="" />
                                </Link>
                                <div className="p-3 !pt-2 text-black/80 sm:p-5">
                                    <Link href={`/user/${blog.author.id}`} className="text-xs font-medium text-black/60">
                                        <span className="underline">{blog.author.name}</span> | {DateTime.fromJSDate(blog.createdAt).toFormat("dd LLL yyyy")}
                                    </Link>
                                    <Link href={`/blog/${blog.id}`} className="mb-1 mt-2 block truncate font-semibold text-blue-700 fluid-text-base">
                                        {blog.title}
                                    </Link>
                                    <p className="line-clamp-3 text-sm text-black/70">{blog.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <NotFound
                        title="No Blogs Found"
                        description={searchParams.q ? `Result for '${searchParams.q}' couldn't be found, try searching something else` : "Create new blogs to show them here"}
                        hideButtons
                    />
                )}
            </div>
        </div>
    )
}

type IPostsReturnType = Pick<blog, "id" | "title" | "description" | "cover_url" | "createdAt"> & { author: Pick<user, "id" | "name"> }
async function getPostsByQuery(query?: string): Promise<IPostsReturnType[]> {
    try {
        if (!query)
            return client.blog.findMany({
                select: { id: true, title: true, cover_url: true, createdAt: true, description: true, author: { select: { id: true, name: true } } },
            })

        return client.blog.aggregateRaw({
            pipeline: [
                {
                    $match: {
                        $text: {
                            $search: query,
                        },
                    },
                },
                {
                    $lookup: {
                        from: "user",
                        localField: "author_id",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                {
                    $unwind: {
                        path: "$author",
                    },
                },
                {
                    $project: {
                        id: "$_id",
                        title: true,
                        description: true,
                        cover_url: true,
                        createdAt: true,
                        author: {
                            id: "$author._id",
                            name: true,
                        },
                        _id: false,
                    },
                },
            ],
        }) as unknown as IPostsReturnType[]
    } catch (error) {
        throw new Error("Error when searching database")
    }
}
