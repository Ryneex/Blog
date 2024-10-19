import { updateAvatar } from "@/actions/user/update/updateAvatar"
import { callActionWithToast } from "@/helpers/callActionWithToast"
import { Avatar } from "@/components/Avatar"
import { useRouter } from "next-nprogress-bar"
import { useDropzone } from "react-dropzone"
import { CiEdit } from "react-icons/ci"
import { toast } from "sonner"

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
        onDropRejected() {
            toast.error("Image size can't be bigger than 2MB!", {
                position: "top-center",
            })
        },
    })
    return (
        <div className="relative">
            <Avatar className="!size-32 text-2xl" src={url} name={name} />
            <div
                className="absolute top-0 grid h-full w-full cursor-pointer place-items-center rounded-full bg-black/80 font-medium tracking-wide text-white opacity-0 duration-300 hover:opacity-100"
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                Change
            </div>
            <CiEdit className="pointer-events-none absolute bottom-0 right-0 size-9 rounded-full border-4 border-white bg-blue-500 p-1 text-white" />
        </div>
    )
}
