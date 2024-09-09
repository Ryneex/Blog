"use client"

import { closeImageDialog$, imageDialogState$, saveImage$, useCellValues, usePublisher } from "@mdxeditor/editor"
import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { Input } from "../shadcn/ui/input"
import { useForm } from "react-hook-form"

export default function InsertImageDialog() {
    const [state] = useCellValues(imageDialogState$)
    const close = usePublisher(closeImageDialog$)
    const saveImage = usePublisher(saveImage$) as () => void

    const { reset, handleSubmit, register } = useForm({
        values:
            state.type === "editing"
                ? { ...state.initialValues, file: "" }
                : {
                      src: "",
                      title: "",
                      altText: "",
                      file: "",
                  },
    })

    return (
        <Modal isOpen={state.type !== "inactive"} onClose={close}>
            <ModalContent>
                <ModalHeader>Add Image Url</ModalHeader>
                <ModalBody>
                    <form
                        className="mb-3 flex flex-col gap-4"
                        onSubmit={(e) => {
                            handleSubmit(saveImage)(e)
                            reset()
                        }}
                    >
                        <div className="space-y-1">
                            <label className="pl-2 text-sm font-medium">Image Url</label>
                            <Input type="url" {...register("src")} placeholder="https://example.com/image" className="h-8 rounded-full" />
                        </div>
                        <div className="space-y-1">
                            <label className="pl-2 text-sm font-medium">Alt Text</label>
                            <Input type="text" {...register("altText")} className="h-8 rounded-full" />
                        </div>
                        <div className="space-y-1">
                            <label className="pl-2 text-sm font-medium">Title</label>
                            <Input type="text" {...register("title")} className="h-8 rounded-full" />
                        </div>
                        <Button type="submit" className="h-8 rounded-full" color="primary">
                            Add
                        </Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
