import { createEditor, MarkdownPlugin } from "@blog/editor"
import { markdownToTxt } from "markdown-to-txt"

export function generateBlogDescription(data: string): string {
    const editor = createEditor({ plugins: [MarkdownPlugin], value: JSON.parse(data) })
    const markdown = editor.api.markdown.serialize()
    return markdownToTxt(markdown).substring(0, 200)
}
