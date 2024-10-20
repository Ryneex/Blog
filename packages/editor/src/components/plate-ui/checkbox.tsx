"use client"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn, withRef } from "@udecode/cn"

import { Icons } from "@editor/components/icons"

export const Checkbox = withRef<typeof CheckboxPrimitive.Root>(({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
            "peer size-4 shrink-0 rounded-full border border-slate-900 bg-white ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=checked]:text-slate-50 dark:border-slate-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900",
            className,
        )}
        {...props}
    >
        <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
            <Icons.check className="size-4" />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
))
