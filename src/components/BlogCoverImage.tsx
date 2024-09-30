"use client"

import { useDropzone } from "react-dropzone"
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react"
import { Input } from "./shadcn/ui/input"
import { memo, useState } from "react"
import Alert from "./Alert"
import { SlCloudUpload } from "react-icons/sl"
import ImageWithFallback from "./ImageWithFallback"

function BlogCoverImage({ src, onValueChange, isPreview }: { src?: string; onValueChange?(image: string | File): any; isPreview?: boolean }) {
    const [imageUrl, setImageUrl] = useState<string | undefined>(src)
    const [inputImageUrl, setInputImageUrl] = useState("")
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
        },
    })

    return (
        <div className="h-full">
            {imageUrl ? (
                <div className="h-full">
                    <ImageWithFallback className="rounded-xl" src={imageUrl} alt="" />
                    {!isPreview && (
                        <Button onClick={onOpen} className="absolute bottom-2 right-2 h-6 rounded-full text-xs" color="primary">
                            Change Cover
                        </Button>
                    )}
                </div>
            ) : (
                <div onClick={onOpen} className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-gray-300 bg-gray-200 text-sm text-gray-500">
                    <SlCloudUpload size={40} />
                    Click Here to Upload Blog Cover
                </div>
            )}

            {!isPreview && (
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
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
                                    }}
                                    className="h-8 rounded-full"
                                    color="primary"
                                >
                                    Add
                                </Button>
                            </div>
                            {dropError && <Alert message={dropError} variant="error" />}
                            <div
                                className="flex h-28 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-slate-400 text-sm text-gray-500"
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <SlCloudUpload size={40} />
                                Select image from device
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </div>
    )
}

export default memo(BlogCoverImage)
