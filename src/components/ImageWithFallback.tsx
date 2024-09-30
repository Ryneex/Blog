"use client"

import { Image, ImageProps, Skeleton } from "@nextui-org/react"
import { useLayoutEffect, useState } from "react"
import { cn } from "./shadcn/utils"
import { IoCloudOfflineOutline } from "react-icons/io5"

export default function ImageWithFallback(props: ImageProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [failedToLoadImage, setFailedToLoadImage] = useState(false)

    useLayoutEffect(() => {
        setFailedToLoadImage(false)
    }, [props])

    return failedToLoadImage ? (
        <div className={cn("flex h-full flex-col items-center justify-center gap-2 border bg-gray-200 text-sm text-gray-400", props.className)}>
            <IoCloudOfflineOutline size={40} /> Failed to load Image
        </div>
    ) : (
        <div className={cn("relative h-full", props.className)}>
            {!isLoaded && <Skeleton className={cn("absolute left-0 top-0 h-full w-full", props.className)}></Skeleton>}
            <Image
                onLoad={() => setIsLoaded(false)}
                onError={() => setFailedToLoadImage(true)}
                {...props}
                classNames={{ wrapper: cn("h-full w-full !max-w-full", props.classNames?.wrapper) }}
                className={cn("z-0 h-full w-full object-cover", props.className)}
                alt={props.alt}
            />
        </div>
    )
}
