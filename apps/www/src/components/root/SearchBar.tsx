"use client"

import { Button, Input } from "@nextui-org/react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useRouter } from "next-nprogress-bar"

export default function SearchBar() {
    const router = useRouter()
    const [input, setInput] = useState(useSearchParams().get("q") ?? "")
    const submit = () => router.push(`/?q=${input}`)

    return (
        <div className="flex w-full items-center gap-2">
            <Input
                className="ml-auto sm:w-fit"
                classNames={{ inputWrapper: "border rounded-full" }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                type="search"
                placeholder="Search..."
                labelPlacement="outside"
                size="sm"
                startContent={<FaSearch className="mx-1" />}
            />
            <Button onClick={submit} className="h-8 rounded-full" color="primary">
                Search
            </Button>
        </div>
    )
}
