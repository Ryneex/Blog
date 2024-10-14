"use client"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"

export default function ErrorComponent({ error, resetErrorBoundary }: { error?: Error | string; resetErrorBoundary?: () => void }) {
    const router = useRouter()
    if (error instanceof Error) {
    }
    return (
        <div className="grid h-full w-full place-items-center">
            <div className="flex max-w-sm flex-col items-center text-center">
                <p className="rounded-full bg-blue-50 p-3 text-sm font-medium text-blue-500 dark:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                </p>
                <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">Something wen&apos;t wrong</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400">{error instanceof Error ? error.message : error}</p>

                <div className="mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
                    <Button
                        onClick={() => {
                            router.back()
                        }}
                        className="flex w-1/2 items-center justify-center gap-x-2 rounded-full border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 rtl:rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>

                        <span>Go back</span>
                    </Button>
                    <Button
                        onClick={resetErrorBoundary}
                        className="h-9 w-1/2 shrink-0 cursor-pointer rounded-full bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-500"
                    >
                        Retry
                    </Button>
                </div>
            </div>
        </div>
    )
}
