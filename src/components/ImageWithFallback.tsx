"use client"

import { Image, ImageProps, Skeleton } from "@nextui-org/react"
import React, { useState } from "react"
import { cn } from "./shadcn/utils"
import { ExcludeKeys } from "@/helpers/excludeKeys"

export default function ImageWithFallback(props: ImageProps & { wrapperClassName: string }) {
    const [isLoaded, setIsLoaded] = useState(false)
    return (
        <div className={cn("relative overflow-hidden", props.wrapperClassName)}>
            <Image onLoad={() => setIsLoaded(true)} onError={() => setIsLoaded(true)} {...ExcludeKeys(props, ["wrapperClassName"])} alt={props.alt} />
            {!isLoaded && <Skeleton className="absolute left-0 top-0 h-full w-full"></Skeleton>}
        </div>
    )
}
