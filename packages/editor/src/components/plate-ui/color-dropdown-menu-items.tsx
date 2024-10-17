"use client"

import type { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu"

import { cn } from "@udecode/cn"

import { Icons } from "@editor/components/icons"

import type { TColor } from "./color-dropdown-menu"

import { buttonVariants } from "./button"
import { DropdownMenuItem } from "./dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

type ColorDropdownMenuItemProps = {
    isBrightColor: boolean
    isSelected: boolean
    updateColor: (color: string) => void
    value: string
    name?: string
} & DropdownMenuItemProps

export function ColorDropdownMenuItem({ className, isBrightColor, isSelected, name, updateColor, value, ...props }: ColorDropdownMenuItemProps) {
    const content = (
        <DropdownMenuItem
            className={cn(
                buttonVariants({
                    isMenu: true,
                    variant: "outline",
                }),
                "size-6 border border-solid border-slate-200 p-0 dark:border-slate-800",
                !isBrightColor && "border-transparent text-white",
                className,
            )}
            style={{ backgroundColor: value }}
            onSelect={(e) => {
                e.preventDefault()
                updateColor(value)
            }}
            {...props}
        >
            {isSelected ? <Icons.check /> : null}
        </DropdownMenuItem>
    )

    return name ? (
        <Tooltip>
            <TooltipTrigger>{content}</TooltipTrigger>
            <TooltipContent>{name}</TooltipContent>
        </Tooltip>
    ) : (
        content
    )
}

type ColorDropdownMenuItemsProps = {
    colors: TColor[]
    updateColor: (color: string) => void
    color?: string
} & React.HTMLAttributes<HTMLDivElement>

export function ColorDropdownMenuItems({ className, color, colors, updateColor, ...props }: ColorDropdownMenuItemsProps) {
    return (
        <div className={cn("grid grid-cols-[repeat(10,1fr)] gap-1", className)} {...props}>
            <TooltipProvider>
                {colors.map(({ isBrightColor, name, value }) => (
                    <ColorDropdownMenuItem name={name} key={name ?? value} value={value} isBrightColor={isBrightColor} isSelected={color === value} updateColor={updateColor} />
                ))}
            </TooltipProvider>
        </div>
    )
}
