import { useRef, useState } from "react"
import { Inter } from "next/font/google"
import TextareaAutosize from "react-textarea-autosize"
import { twMerge } from "tailwind-merge"
const inter = Inter({ subsets: ["latin"] })

export default function EditorText({
    variant,
    onValueChange,
    initialValue,
    isPreview,
    className,
}: {
    variant: "heading" | "paragraph"
    onValueChange?: (e: string) => unknown
    initialValue?: string
    isPreview?: boolean
    className?: string
}) {
    const [value, setValue] = useState(initialValue || "")
    const [isEditable, setIsEditable] = useState(false)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const style = variant == "heading" ? "fluid-text-5xl/normal font-bold" : "text-base/normal"
    return (
        <div className={twMerge("px-[4px] py-[3px] text-[#3f3f3f]", style, inter.className, className)}>
            {isEditable ? (
                <TextareaAutosize
                    ref={textarea}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setIsEditable(false)
                        }
                    }}
                    placeholder={variant == "heading" ? "Heading" : "Your blog description goes here"}
                    onBlur={() => setIsEditable(false)}
                    className="block w-full resize-none overflow-hidden outline-none placeholder:text-black/40"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        onValueChange && onValueChange(e.target.value)
                    }}
                />
            ) : (
                <div
                    className="break-words"
                    onClick={() => {
                        if (isPreview) return
                        setIsEditable(true)
                        setTimeout(() => textarea.current?.focus(), 0)
                    }}
                >
                    {value || <span className="text-black/40">{variant == "heading" ? "Heading" : "Your blog description goes here"}</span>}
                </div>
            )}
        </div>
    )
}
