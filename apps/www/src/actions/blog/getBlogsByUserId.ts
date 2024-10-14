"use server"

import { client } from "@/lib/prismaClient"
import { IBlogCardInfo } from "@/types/blog"

export async function getBlogsByUserId({ userId, skip }: { userId: string; skip: number }): Promise<IBlogCardInfo[] | null> {
    try {
        return await client.blogs.findMany({
            select: { id: true, title: true, coverUrl: true, createdAt: true, description: true, author: { select: { id: true, name: true } } },
            where: { authorId: userId },
            skip,
            take: 12,
            orderBy: {
                createdAt: "desc",
            },
        })
    } catch (error) {
        return null
    }
}
