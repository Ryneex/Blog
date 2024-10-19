"use client"

import { deleteAccount } from "@/actions/user/update/deleteAccount"
import { Input } from "@/components/shadcn/ui/input"
import { callActionWithToast } from "@/helpers/callActionWithToast"
import { passwordValidation } from "@/validations/user"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { useRouter } from "next-nprogress-bar"
import { useState } from "react"

export default function DeleteAccount({ hasPassword }: { hasPassword: boolean }) {
    const { onOpenChange, onOpen, isOpen } = useDisclosure()
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string>()
    const router = useRouter()

    async function submit() {
        const validate = passwordValidation.safeParse(hasPassword ? password : "dummypassword")
        if (!validate.success) return setError(validate.error.flatten().formErrors.at(0))
        const res = await callActionWithToast(deleteAccount(validate.data))
        if (res.success) router.refresh()
    }

    return (
        <div className="w-full space-y-3 overflow-hidden rounded-xl border border-red-300">
            <div className="p-4 pb-2">
                <h2 className="text-xl font-medium text-red-600">Delete Account</h2>
                <p className="text-sm">Permanently remove your Personal Account and all of its contents from this platform. This action is not reversible, so please continue with caution.</p>
            </div>
            <div className="flex h-14 w-full items-center justify-end border-t border-red-300 bg-red-50">
                <Button onClick={onOpen} className="mr-2 h-9 rounded-full bg-red-600" color="danger">
                    Delete Account
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        <ModalHeader className="pb-0">Delete Account</ModalHeader>
                        <ModalBody>
                            <span className="text-sm">Blogy will delete all of your blogs, along with all of your comments and replies belonging to your Personal Account.</span>
                            {hasPassword && (
                                <div className="space-y-1">
                                    <span className="text-sm font-medium">Enter your password</span>
                                    <Input value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {error && <span className="text-sm text-red-500">{error}</span>}
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={submit} className="h-9 rounded-full bg-red-600" color="danger">
                                Delete
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )
}
