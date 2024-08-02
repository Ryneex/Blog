import { toast } from "sonner"

export async function callActionWithToast<T extends object, M extends string>(promise: Promise<T>, message?: M): Promise<T> {
    const response = await promise
    const position = { position: "top-center" } as const
    if ("success" in response && typeof response.success === "boolean") {
        if ("message" in response && typeof response.message === "string") {
            toast[response.success ? "success" : "error"](response.message, position)
        } else toast.success(message || "success", position)
    }
    return response
}
