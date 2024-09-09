"use client"

import { useRef, useState } from "react"
import { Inter } from "next/font/google"
import TextareaAutosize from "react-textarea-autosize"
import { twMerge } from "tailwind-merge"
const inter = Inter({ subsets: ["latin"] })

export default function EditorHeader({
    onValueChange,
    initialValue,
    isPreview,
    className,
}: {
    onValueChange?: (e: string) => unknown
    initialValue?: string
    isPreview?: boolean
    className?: string
}) {
    const [value, setValue] = useState(initialValue || "")
    const [isEditable, setIsEditable] = useState(false)
    const textarea = useRef<HTMLTextAreaElement>(null)
    return (
        <div className={twMerge("py-5 text-5xl font-bold", inter.className, className)}>
            {isEditable ? (
                <TextareaAutosize
                    ref={textarea}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setIsEditable(false)
                        }
                    }}
                    placeholder={"Heading"}
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
                    {value || <span className="text-black/40">Heading</span>}
                </div>
            )}
        </div>
    )
}
