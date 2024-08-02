import { toast } from "sonner"

export async function callActionWithToast<T extends object, M extends string>(promise: Promise<T>, message?: M): Promise<T> {
    const toastId = toast.loading("Processing your request", {
        position: "top-center",
    })
    const response = await promise
    const toastOption = { position: "top-center", id: toastId } as const
    if ("success" in response && typeof response.success === "boolean") {
        if ("message" in response && typeof response.message === "string") {
            toast[response.success ? "success" : "error"](response.message, toastOption)
        } else toast.success(message || "success", toastOption)
    }
    return response
}
