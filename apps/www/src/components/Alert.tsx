import { cn } from "./shadcn/utils"

export default function Alert({ message, variant, className }: { message: string; variant: keyof typeof variants; className?: string }) {
    const variants = {
        success: {
            class: "bg-green-100 text-green-800",
            name: "Success!",
        },
        warning: {
            class: "bg-yellow-100 text-yellow-800",
            name: "Warning!",
        },
        error: {
            class: "bg-red-100 text-red-800",
            name: "Error!",
        },
        info: {
            class: "bg-blue-100 text-blue-800",
            name: "Info!",
        },
    }
    return (
        <div className={cn("rounded-lg px-4 py-2 " + variants[variant].class, className)} role="alert">
            <strong className="mr-4 text-sm font-bold">{variants[variant].name}</strong>
            <span className="block text-sm max-sm:mt-2 sm:inline">{message}</span>
        </div>
    )
}
