import type { PlateContentProps } from "@udecode/plate-common/react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@udecode/cn"
import { PlateContent } from "@udecode/plate-common/react"
import { cva } from "class-variance-authority"
import { forwardRef } from "react"

const editorVariants = cva(
    cn(
        "relative overflow-x-auto whitespace-pre-wrap break-words text-foreground outline-none",
        "min-h-[80px] w-full rounded-xl bg-white px-6 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none' dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400",
        "[&_[data-slate-placeholder]]:text-slate-500 [&_[data-slate-placeholder]]:!opacity-100' dark:'[&_[data-slate-placeholder]]:text-slate-400",
        "[&_[data-slate-placeholder]]:top-[auto_!important]",
        "[&_strong]:font-bold",
    ),
    {
        defaultVariants: {
            size: "md",
            variant: "outline",
        },
        variants: {
            disabled: {
                true: "cursor-not-allowed opacity-50",
            },
            focusRing: {
                false: "",
                true: "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' dark:focus-visible:ring-slate-300",
            },
            focused: {
                true: "ring-2 ring-slate-950 ring-offset-2' dark:ring-slate-300",
            },
            size: {
                md: "text-base",
                sm: "text-sm",
            },
            variant: {
                ghost: "",
                outline: "border border-input",
            },
        },
    },
)

export type EditorProps = PlateContentProps & VariantProps<typeof editorVariants>

const ContentEditor = forwardRef<HTMLDivElement, EditorProps>(({ className, disabled, focusRing, focused, readOnly, size, variant, ...props }, ref) => {
    return (
        <div ref={ref} className="relative w-full">
            <PlateContent
                className={cn(
                    editorVariants({
                        disabled,
                        focusRing,
                        focused,
                        size,
                        variant,
                    }),
                    className,
                )}
                readOnly={disabled ?? readOnly}
                aria-disabled={disabled}
                data-plate-selectable
                disableDefaultStyles
                {...props}
            />
        </div>
    )
})
ContentEditor.displayName = "ContentEditor"

export { ContentEditor }
