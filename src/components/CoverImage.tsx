"use client"

import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"
import { useDropzone } from "react-dropzone"
import { Button, Image, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react"
import { Input } from "./shadcn/ui/input"
import { useState } from "react"
import Alert from "./Alert"

export default function CoverImage({ src, onValueChange, isPreview }: { src?: string; onValueChange?(image: string | File): any; isPreview?: boolean }) {
    const [imageUrl, setImageUrl] = useState<string | undefined>(src)
    const [inputImageUrl, setInputImageUrl] = useState("")
    const [failedToLoadImage, setFailedToLoadImage] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [dropError, setDropError] = useState("")

    const { getInputProps, getRootProps } = useDropzone({
        accept: { "image/png": [".png", ".jpg", ".jpeg"] },
        maxFiles: 1,
        maxSize: 2e6,
        onDropRejected(fileRejections) {
            setDropError(fileRejections[0].errors[0].message)
        },
        onDropAccepted: (file) => {
            setDropError("")
            const imageFile = file[0]
            onValueChange && onValueChange(imageFile)
            setImageUrl(URL.createObjectURL(imageFile))
            onOpenChange()
            setFailedToLoadImage(false)
        },
    })

    return (
        <div className="h-full">
            {imageUrl ? (
                <div className="relative h-full">
                    {failedToLoadImage ? (
                        <div className="grid h-full place-items-center rounded-xl border text-sm text-red-400">Failed to load Image</div>
                    ) : (
                        <Image onError={() => setFailedToLoadImage(true)} classNames={{ wrapper: "h-full w-full !max-w-full" }} className="z-0 h-full w-full object-cover" src={imageUrl} alt="" />
                    )}
                    {!isPreview && (
                        <Button onClick={onOpen} className="absolute bottom-2 right-2 h-6 rounded-full text-xs" color="primary">
                            Change Cover
                        </Button>
                    )}
                </div>
            ) : (
                <div onClick={onOpen} className="grid h-full cursor-pointer place-items-center border text-sm text-blue-500">
                    Click Here to Upload Blog Cover
                </div>
            )}

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="pb-0">Add Image</ModalHeader>
                            <ModalBody>
                                <div className="flex gap-2">
                                    <Input type="url" value={inputImageUrl} onChange={(e) => setInputImageUrl(e.target.value)} placeholder="https://example.com/image" className="h-8 rounded-full" />
                                    <Button
                                        onClick={() => {
                                            setDropError("")
                                            setImageUrl(inputImageUrl)
                                            onValueChange && onValueChange(inputImageUrl)
                                            onOpenChange()
                                            setFailedToLoadImage(false)
                                        }}
                                        className="h-8 rounded-full"
                                        color="primary"
                                    >
                                        Add
                                    </Button>
                                </div>
                                {dropError && <Alert message={dropError} variant="error" />}
                                <div className="grid h-full w-full cursor-pointer place-items-center rounded-md border border-dashed border-slate-400" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p className="py-10 text-sm text-black/50">Select Image from Device</p>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
