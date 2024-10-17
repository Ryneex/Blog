import { Value } from "@blog/editor"

export function parseContent(data?: string | null): Value {
    try {
        if (typeof data === "string") {
            return JSON.parse(data)
        }
        return [{ type: "p", children: [{ text: "Hello World!!" }] }]
    } catch (error) {
        return [{ type: "p", children: [{ text: "Hello World!!" }] }]
    }
}
