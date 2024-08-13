import { updateAvatar } from "@/actions/user/update/updateAvatar"
import { callActionWithToast } from "@/helpers/callActionWithToast"
import { Avatar } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useDropzone } from "react-dropzone"
import { CiEdit } from "react-icons/ci"

export default function AvatarUpload({ url, name }: { url: string | null; name: string }) {
    const router = useRouter()
    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/png": [".png", ".jpg", ".jpeg"] },
        maxFiles: 1,
        maxSize: 2e6,
        async onDropAccepted(files) {
            const image = files[0]
            const formData = new FormData()
            formData.append("image", image)
            const res = await callActionWithToast(updateAvatar(formData))
            if (res.success) router.refresh()
        },
    })
    return (
        <div className="relative">
            <Avatar className="!size-32" src={url ?? undefined} name={name} />
            <div
                className="absolute top-0 grid h-full w-full cursor-pointer place-items-center rounded-full bg-black/80 font-medium tracking-wide text-white opacity-0 duration-300 hover:opacity-100"
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                Change
            </div>
            <CiEdit className="pointer-events-none absolute bottom-2 right-2 size-9 rounded-full bg-blue-500 p-1.5 text-white" />
        </div>
    )
}
