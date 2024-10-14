import { getBlogsByUserId } from "@/actions/blog/getBlogsByUserId"
import ProfileInfiniteBlogScroll from "./ProfileInfiniteBlogScroll"

export default async function RecentBlogs({ userId }: { userId: string }) {
    await new Promise((res) => setTimeout(res, 2000))
    const blogs = await getBlogsByUserId({ userId, skip: 0 })
    if (!blogs?.length) return <div className="grid h-20 place-items-center text-sm text-black/70">This user haven&apos;t created any blogs yet</div>
    return <ProfileInfiniteBlogScroll userId={userId} initialData={blogs ?? []} />
}
