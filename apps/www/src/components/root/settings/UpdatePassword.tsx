"use client"

import { updatePassword } from "@/actions/user/update/updatePassword"
import { Input } from "@/components/shadcn/ui/input"
import { callActionWithToast } from "@/helpers/callActionWithToast"
import { updatePasswordValidation } from "@/validations/user"
import { Button } from "@nextui-org/react"
import { useRouter } from "next-nprogress-bar"
import { useEffect, useState } from "react"

export default function UpdatePassword({ hasPassword }: { hasPassword: boolean }) {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [errors, setErrors] = useState<Partial<{ currentPassword: string; newPassword: string }>>({})
    const [passwordUpdateEnabled, setPasswordUpdateEnabled] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if (!currentPassword && !newPassword) {
            setPasswordUpdateEnabled(false)
            return setErrors({})
        }
        const validate = updatePasswordValidation.safeParse({ currentPassword: hasPassword ? currentPassword : "dummypassword", newPassword })
        if (validate.success) {
            setErrors({})
            return setPasswordUpdateEnabled(true)
        }
        const currentError = validate.error.flatten().fieldErrors.currentPassword?.at(0)
        const newError = validate.error.flatten().fieldErrors.newPassword?.at(0)
        setErrors({ currentPassword: currentError, newPassword: newError })
        setPasswordUpdateEnabled(false)
    }, [currentPassword, newPassword, hasPassword])

    async function submitPassword() {
        const res = await callActionWithToast(updatePassword({ currentPassword: hasPassword ? currentPassword : "dummypassword", newPassword }))
        if (res.success) {
            setCurrentPassword("")
            setNewPassword("")
            router.refresh()
        }
    }

    return (
        <div className="space-y-3">
            <h2 className="text-xl font-medium text-black/70">Change Password</h2>
            <div className="flex gap-3">
                <div className="w-full max-w-xs">
                    <span className="text-sm font-medium text-black/70">Current Password</span>
                    <Input disabled={!hasPassword} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="border-zinc-300 shadow-none" type="password" />
                    {errors.currentPassword && <span className="text-sm text-red-500">{errors.currentPassword}</span>}
                </div>
                <div className="w-full max-w-xs">
                    <span className="text-sm font-medium text-black/70">New Password</span>
                    <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border-zinc-300 shadow-none" type="password" />
                    {errors.newPassword && <span className="text-sm text-red-500">{errors.newPassword}</span>}
                </div>
            </div>
            <Button onPress={submitPassword} isDisabled={!passwordUpdateEnabled} className="h-8 w-fit rounded-full px-6" color="primary">
                Save Password
            </Button>
        </div>
    )
}
