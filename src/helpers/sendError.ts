export function sendError(e: unknown) {
    if (typeof e === "string") return { success: false, message: e }
    if (e instanceof Error) return { success: false, message: e.message }
    return { success: false, message: "Something wen't wrong" }
}
