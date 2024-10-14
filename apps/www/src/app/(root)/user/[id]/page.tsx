import ImageWithFallback from "@/components/ImageWithFallback"
import { NotFound } from "@/components/NotFound"
import { getCurrentUser } from "@/helpers/getCurrentUser"
import { client } from "@/lib/prismaClient"
import { Avatar } from "@/components/Avatar"
import { FiEdit2 } from "react-icons/fi"
import { BsImageAlt } from "react-icons/bs"
import Link from "next/link"
import { CiEdit } from "react-icons/ci"
import { Suspense } from "react"
import RecentComments from "@/components/root/user/RecentComments"
import { Button, Spinner } from "@nextui-org/react"
import RecentBlogs from "@/components/root/user/RecentBlogs"

export default async function page({ params: { id } }: { params: { id: string } }) {
    const { user: currentUser } = await getCurrentUser()
    const result = await client.users.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            bio: true,
            avatarUrl: true,
            blogs: { take: 1, select: { coverUrl: true }, orderBy: { createdAt: "desc" } },
            _count: { select: { blogs: true, comments: true } },
        },
    })
    if (!result) return <NotFound />

    const { blogs, ...rest } = result
    const user = { ...rest, coverUrl: blogs[0]?.coverUrl ?? null }

    return (
        <div className="overflow-auto">
            <div className="container py-5">
                <div className="relative w-full rounded-xl border bg-white shadow-sm">
                    {user.coverUrl ? (
                        <ImageWithFallback className="aspect-[10/5] rounded-xl md:aspect-[10/3]" src={user.coverUrl}></ImageWithFallback>
                    ) : (
                        <div className="grid aspect-[10/5] place-items-center rounded-xl border bg-gray-200 md:aspect-[10/3]">
                            <BsImageAlt className="opacity-30" size={80} />
                        </div>
                    )}
                    <div className="flex flex-col items-center px-5 sm:flex-row sm:items-start sm:gap-10">
                        <div className="relative z-10 -translate-y-1/3">
                            <Avatar className="z-10 !size-36 border-[7px] border-white text-4xl font-bold sm:!size-44" src={user.avatarUrl} name={user.name} />
                            <Link className="absolute bottom-3 right-2 z-10" href="/settings">
                                <CiEdit className="size-9 rounded-full border-4 border-white bg-blue-500 p-1 text-white hover:bg-blue-600" />
                            </Link>
                        </div>
                        <div className="flex -translate-y-10 flex-col items-center pt-3 sm:-translate-y-0 sm:items-start">
                            <span className="~text-xl/2xl pb-2 font-medium">{user.name}</span>
                            <div className="flex items-center gap-5 text-sm font-medium text-black/70">
                                <span>{user._count.blogs} Blogs</span>
                                <span>{user._count.comments} Comments</span>
                            </div>
                            {user.bio && <hr className="my-1.5 w-full" />}
                            <span className="text-sm text-black/80">{user.bio}</span>
                        </div>
                        {currentUser?.id === id && (
                            <Button as={Link} href="/settings" className="ml-auto mt-4 hidden h-8 rounded-full sm:flex" color="primary" variant="solid" startContent={<FiEdit2 />}>
                                Edit
                            </Button>
                        )}
                    </div>
                </div>
                <div className="mt-10 flex flex-col gap-5 lg:flex-row">
                    <div className="flex h-min min-h-40 shrink-0 flex-col rounded-xl border bg-white p-3 shadow-sm sm:p-5 lg:min-w-[350px] xl:min-w-96">
                        <h1 className="pb-3 text-lg font-semibold text-black/80">Recent Comments</h1>
                        <Suspense fallback={<Spinner className="mx-auto mt-5" color="primary" />}>
                            <RecentComments userId={id} />
                        </Suspense>
                    </div>
                    <div className="min-h-40 w-full rounded-xl border bg-white p-3 shadow-sm sm:p-5">
                        <h1 className="pb-3 text-xl font-semibold text-black/80">Recent Blogs</h1>
                        <Suspense
                            fallback={
                                <div className="grid h-20 place-items-center">
                                    <Spinner />
                                </div>
                            }
                        >
                            <RecentBlogs userId={id} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}
