"use client"

import { linkDialogState$, cancelLinkEdit$, updateLink$, removeLink$, switchFromPreviewToLinkEdit$, useCellValues, usePublisher } from "@mdxeditor/editor"
import * as Popover from "@radix-ui/react-popover"
import { Input } from "../shadcn/ui/input"
import { motion } from "framer-motion"
import { Button } from "@nextui-org/react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { FaRegCopy } from "react-icons/fa6"
import { FiEdit3 } from "react-icons/fi"
import { LuLink2Off } from "react-icons/lu"

export default function LinkDialog() {
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")

    const [state] = useCellValues(linkDialogState$)
    const close = usePublisher(cancelLinkEdit$)
    const update = usePublisher(updateLink$)
    const removeLink = usePublisher(removeLink$)
    const switchFromPreviewToLinkEdit = usePublisher(switchFromPreviewToLinkEdit$)

    const closeDialog = () => state.type === "edit" && close()

    // close dialog when resizing
    useEffect(() => {
        window.addEventListener("resize", closeDialog)
        return () => window.removeEventListener("resize", closeDialog)
    }, [state.type])

    function submit() {
        update({ url, title })
    }

    return (
        <Popover.Root open={state.type !== "inactive"}>
            <Popover.Anchor
                style={{
                    top: state.rectangle?.top,
                    left: state.rectangle?.left,
                    width: state.rectangle?.width,
                    height: state.rectangle?.height,
                    position: "fixed",
                }}
            />
            <Popover.Portal>
                <Popover.Content className="outline-none" align="center" sideOffset={20} onOpenAutoFocus={(e) => e.preventDefault()}>
                    <motion.div animate={{ scale: 1, opacity: 1 }} initial={{ scale: 0.9, opacity: 0 }} className="z-50 w-72 rounded-md border bg-white p-2 shadow-md">
                        {state.type === "edit" && (
                            <div>
                                <span className="text-sm font-medium text-black/80">Title</span>
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 h-8 border-zinc-300 shadow-none" />
                                <span className="text-sm font-medium text-black/80">Url</span>
                                <Input value={url} onChange={(e) => setUrl(e.target.value)} className="mt-1 h-8 border-zinc-300 shadow-none" />
                                <div className="mt-3 flex justify-end gap-2">
                                    <Button onClick={closeDialog} size="sm">
                                        Cancel
                                    </Button>
                                    <Button onClick={submit} size="sm" color="primary">
                                        Save
                                    </Button>
                                </div>
                            </div>
                        )}
                        {state.type === "preview" && (
                            <div className="flex items-center justify-between gap-2 text-sm">
                                <Link className="truncate text-blue-500" href={state.url}>
                                    {state.title || state.url}
                                </Link>
                                <div className="flex gap-1 text-2xl">
                                    <FiEdit3 title="Edit" onClick={() => switchFromPreviewToLinkEdit()} className="cursor-pointer rounded-md p-1 hover:bg-gray-200" />
                                    <FaRegCopy title="Copy to Clipboard" onClick={() => navigator.clipboard.writeText(state.url)} className="cursor-pointer rounded-md p-1 hover:bg-gray-200" />
                                    <LuLink2Off title="Remove Link" onClick={() => removeLink()} className="cursor-pointer rounded-md p-1 hover:bg-gray-200" />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
