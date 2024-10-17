import { Popover, PopoverContent, PopoverTrigger } from "@editor/components/plate-ui/popover"
import { ToolbarButton } from "./plate-ui/toolbar"
import { Icons } from "./icons"
import { Input } from "./plate-ui/input"
import { Button } from "./plate-ui/button"
import { useState } from "react"
import { insertImage } from "@udecode/plate-media"
import { useEditorRef } from "@udecode/plate-common/react"

export function ImageToolbarButton() {
    const [open, setOpen] = useState(false)
    const close = () => setOpen(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <ToolbarButton pressed={open}>
                    <Icons.image />
                </ToolbarButton>
            </PopoverTrigger>
            <PopoverContent sideOffset={0} className="rounded-xl">
                <Content close={close} />
            </PopoverContent>
        </Popover>
    )
}

function Content({ close }: { close: () => void }) {
    const editor = useEditorRef()
    const [imgUrl, setImgUrl] = useState("")

    return (
        <div className="min-w-40 space-y-2">
            <div className="font-semibold">Image Url</div>
            <Input value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} placeholder="https://" h="sm" className="focus-visible:ring-transparent" />
            <Button
                onClick={() => {
                    insertImage(editor, imgUrl)
                    close()
                }}
                size="xs"
                className="w-full bg-blue-500"
            >
                Add
            </Button>
        </div>
    )
}
