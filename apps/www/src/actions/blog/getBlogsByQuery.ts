"use server"

import { client } from "@/lib/prismaClient"
import { IBlogCardInfo } from "@/types/blog"

export async function getBlogsByQuery({ query, skip }: { query?: string; skip: number }): Promise<IBlogCardInfo[] | null> {
    try {
        return await client.blogs.findMany({
            select: {
                id: true,
                title: true,
                coverUrl: true,
                createdAt: true,
                description: true,
                author: { select: { id: true, name: true } },
            },
            where: query
                ? {
                      OR: [
                          {
                              title: {
                                  contains: query,
                                  mode: "insensitive",
                              },
                          },
                          {
                              description: {
                                  contains: query,
                                  mode: "insensitive",
                              },
                          },
                      ],
                  }
                : undefined,
            skip,
            take: 12,
        })
    } catch (error) {
        return null
    }
}
