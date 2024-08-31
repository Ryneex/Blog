import ImageWithFallback from "@/components/ImageWithFallback"
import { NotFound } from "@/components/NotFound"
import { getCurrentUser } from "@/helpers/getCurrentUser"
import { client } from "@/lib/prismaClient"
import { Avatar, Button } from "@nextui-org/react"
import { FiEdit2 } from "react-icons/fi"
import { BsImageAlt } from "react-icons/bs"
import { getColorBasedOnText } from "@/lib/utils"

export default async function page({ params: { id } }: { params: { id: string } }) {
    const { user: currentUser } = await getCurrentUser()
    const user = await client.users.findUnique({ where: { id }, select: { name: true, bio: true, avatarUrl: true, blog: { take: 1, select: { coverUrl: true }, orderBy: { createdAt: "desc" } } } })
    if (!user) return <NotFound />
    return (
        <div className="overflow-auto">
            <div className="container py-5">
                <div className="relative w-full">
                    {user.blog[0] ? (
                        <ImageWithFallback
                            classNames={{ wrapper: "!max-w-none" }}
                            wrapperClassName="rounded-xl"
                            className="aspect-[10/5] w-full object-cover md:aspect-[10/3]"
                            src={user.blog[0] && user.blog[0].coverUrl}
                        ></ImageWithFallback>
                    ) : (
                        <div className="grid aspect-[10/5] place-items-center rounded-xl border bg-gray-200 md:aspect-[10/3]">
                            <BsImageAlt className="opacity-30" size={80} />
                        </div>
                    )}
                    <div className="flex gap-10 px-5">
                        <Avatar
                            style={{ backgroundColor: !user.avatarUrl ? getColorBasedOnText(user.name) : undefined }}
                            className="z-10 !size-44 -translate-y-1/2 border-[7px] border-white text-4xl font-bold text-white"
                            src={user.avatarUrl ?? undefined}
                            name={user.name.slice(0, 2)}
                        />
                        <div className="flex flex-col pt-3">
                            <span className="font-medium fluid-text-lg">{user.name}</span>
                            <span className="text-black/70">{user.bio}</span>
                        </div>
                        {currentUser?.id === id && (
                            <Button className="ml-auto mt-4 h-8 rounded-full" color="primary" variant="solid" startContent={<FiEdit2 />}>
                                Edit
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
