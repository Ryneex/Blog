"use client"

import { signup } from "@/actions/user/auth/signup"
import Alert from "@/components/Alert"
import { Input } from "@/components/shadcn/ui/input"
import useCreateUrlWithRedirectParam from "@/hooks/useCreateUrlWithRedirectParam"
import { signupValidation } from "@/validations/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaGithub } from "react-icons/fa"

export default function Page({ searchParams }: { searchParams: Record<string, string> }) {
    const [serverSentError, setServerSentError] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(signupValidation),
    })

    const { mutate, isPending } = useMutation({
        mutationFn: signup,
        onSettled(data) {
            if (!data?.success) {
                return setServerSentError(data?.message || "Something wen't wrong")
            }
            window.location.href = searchParams.redirectUrl ?? "/"
        },
    })

    const signinUrl = useCreateUrlWithRedirectParam("/signin")

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit((e) => mutate(e))} className="flex h-full w-full max-w-md flex-col gap-5 px-5 py-3 sm:rounded-3xl sm:border sm:bg-white sm:px-10 sm:py-8 sm:shadow-md">
                <h1 className="mx-auto text-2xl font-bold">Sign up</h1>
                {/* Name */}
                <div>
                    <span className="mb-2 block text-sm font-medium text-black/90">Name</span>
                    <Input {...register("name")} placeholder="John Doe" type="text" className="rounded-full" />
                    {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
                </div>
                {/* Email */}
                <div>
                    <span className="mb-2 block text-sm font-medium text-black/90">Email</span>
                    <Input {...register("email")} placeholder="mail@gmail.com" type="email" className="rounded-full" />
                    {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
                </div>
                {/* Password */}
                <div>
                    <span className="mb-2 block text-sm font-medium text-black/90">Password</span>
                    <Input {...register("password")} placeholder="password" type="password" className="rounded-full" />
                    {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
                </div>
                {serverSentError && <Alert className="rounded-full" message={serverSentError} variant="error" />}
                <div className="flex flex-col gap-3">
                    <Button isLoading={isPending} type="submit" className="h-9 rounded-full" color="primary">
                        Sign up
                    </Button>
                    <div className="flex items-center gap-3">
                        <hr className="w-full" />
                        <span className="text-center text-sm font-medium text-black/60">Or</span>
                        <hr className="w-full" />
                    </div>
                    <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=Ov23li2yPpt6UtR9agpF">
                        <Button startContent={<FaGithub size={18} />} isDisabled={isPending} type="button" className="h-9 w-full rounded-full border font-medium text-black/70" variant="light">
                            Login with Github
                        </Button>
                    </a>
                </div>
                <Link className="mx-auto text-sm font-medium text-blue-500" href={signinUrl}>
                    Already have an account?
                </Link>
            </form>
        </div>
    )
}
