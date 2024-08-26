"use client"

import { Input } from "@/components/shadcn/ui/input"
import { IPrivateUser } from "@/types/user"
import { BreadcrumbItem, Breadcrumbs, Button, Textarea } from "@nextui-org/react"
import AvatarUpload from "./AvatarUpload"
import { useEffect, useState } from "react"
import { updateUserValidation } from "@/validations/user"
import { callActionWithToast } from "@/helpers/callActionWithToast"
import { updateProfile } from "@/actions/user/update/updateProfile"
import { useRouter } from "next/navigation"

const isEqual = (obj: object, obj2: object) => JSON.stringify(obj) === JSON.stringify(obj2)

export default function AccountSettings({ userData }: { userData: IPrivateUser }) {
    const [name, setName] = useState(userData.name)
    const [bio, setBio] = useState(userData.bio)
    const [errors, setErrors] = useState<Partial<{ name: string; bio: string }>>({})
    const [updateEnabled, setUpdateEnabled] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const newData = { ...userData, name, bio: bio || null }
        if (!isEqual(newData, userData)) {
            const validate = updateUserValidation.safeParse(newData)
            if (validate.success) {
                setErrors({})
                return setUpdateEnabled(true)
            }
            const nameError = validate.error.flatten().fieldErrors.name
            const bioError = validate.error.flatten().fieldErrors.bio
            setErrors({ name: nameError && nameError[0], bio: bioError && bioError[0] })
            return setUpdateEnabled(false)
        }
        setErrors({})
        setUpdateEnabled(false)
    }, [userData, name, bio])

    async function submit() {
        const res = await callActionWithToast(updateProfile({ name, bio }))
        if (res.success) router.refresh()
    }

    return (
        <div className="w-full overflow-auto">
            <Breadcrumbs className="hidden sm:block">
                <BreadcrumbItem>Settings</BreadcrumbItem>
                <BreadcrumbItem>Account</BreadcrumbItem>
            </Breadcrumbs>
            <h1 className="mt-3 font-medium text-black/70 text-2xl">Account Settings</h1>
            <div className="mt-3 flex flex-col gap-5 sm:mt-5">
                <div className="w-fit space-y-1">
                    <span className="text-sm font-medium text-black/80">Profile Avatar</span>
                    <AvatarUpload url={userData.avatar_url} name={userData.name} />
                </div>
                <div className="flex gap-3 sm:gap-7">
                    <div className="w-full space-y-1">
                        <span className="text-sm font-medium text-black/80">Name</span>
                        <Input onChange={(e) => setName(e.target.value)} value={name} className="border-zinc-300 shadow-none" />
                    </div>
                    <div className="w-full space-y-1">
                        <span className="text-sm font-medium text-black/80">Email Address</span>
                        <Input value={userData.email} disabled className="border-zinc-300 shadow-none" />
                    </div>
                </div>
                {errors.name && <span className="-mt-4 text-sm text-red-500">{errors.name}</span>}
                <div className="space-y-1">
                    <span className="text-sm font-medium text-black/80">Bio</span>
                    <Textarea onValueChange={setBio} value={bio ?? ""} variant="bordered" placeholder="Add your bio" classNames={{ inputWrapper: "border-1 shadow-none border-zinc-300" }} />
                    {errors.bio && <span className="text-sm text-red-500">{errors.bio}</span>}
                </div>
                <Button onPress={submit} isDisabled={!updateEnabled} className="ml-auto h-9 rounded-full px-7" color="primary">
                    Update
                </Button>
            </div>
        </div>
    )
}
