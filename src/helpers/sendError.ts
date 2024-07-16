export function sendError(e: unknown, errHandler?: (err: Error) => string | undefined): { success: false; message: string } {
    if (typeof e === "string") return { success: false, message: e }
    if (e instanceof Error) {
        const message = errHandler && errHandler(e)
        return { success: false, message: message || "Something wen't wrong" }
    }
    return { success: false, message: "Something wen't wrong" }
}
