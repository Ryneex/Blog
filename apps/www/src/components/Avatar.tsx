import { getColorBasedOnText } from "@/lib/utils/getColorBasedOnText"
import { AvatarProps, Avatar as Nextui_Avatar } from "@nextui-org/react"
import { cn } from "./shadcn/utils"
import { forwardRef } from "react"

type Props = Omit<AvatarProps, "src"> & {
    src?: string | null
}

function AvatarComponent(props: Props, ref: React.Ref<HTMLSpanElement>) {
    return (
        <Nextui_Avatar
            ref={ref}
            {...props}
            className={cn("text-white", props.className)}
            style={{ backgroundColor: !props.src ? getColorBasedOnText(props.name ?? "") : undefined }}
            src={props.src ?? undefined}
            name={props.name?.slice(0, 2)}
        />
    )
}

export const Avatar = forwardRef(AvatarComponent)
