"use client"

import { signin } from "@/actions/user/signin"
import Alert from "@/components/Alert"
import { Input } from "@/components/shadcn/ui/input"
import { signinValidation } from "@/validations/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function Page() {
    const [serverSentError, setServerSentError] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(signinValidation),
    })

    const { mutate, isPending } = useMutation({
        mutationFn: signin,
        onSettled(data) {
            console.log(data)
            if (!data!.success) {
                setServerSentError(data!.message)
            }
        },
    })

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit((e) => mutate(e))} className="flex h-full w-full max-w-md flex-col gap-5 rounded-3xl border bg-white px-10 py-8 shadow-md">
                <h1 className="mx-auto text-2xl font-bold">Sign in</h1>
                {/* Email */}
                <div>
                    <span className="mb-2 block text-sm font-medium text-black/90">Email</span>
                    <Input {...register("email")} placeholder="mail@gmail.com" type="email" className="rounded-full" />
                    {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
                </div>
                {/* Password */}
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-black/90">Password</span>
                        <Link href="" className="text-sm font-semibold text-blue-500">
                            Forgot password?
                        </Link>
                    </div>
                    <Input {...register("password")} placeholder="password" type="password" className="rounded-full" />
                    {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
                </div>
                {serverSentError && <Alert className="rounded-full" message={serverSentError} variant="error" />}
                <Button isLoading={isPending} type="submit" className="h-9 rounded-full" color="primary">
                    Sign in
                </Button>
                <Link className="mx-auto text-sm font-medium text-blue-500" href="/signup">
                    Dont have an account?
                </Link>
            </form>
        </div>
    )
}
