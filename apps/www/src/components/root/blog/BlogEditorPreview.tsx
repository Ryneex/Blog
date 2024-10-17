"use client"

import { Editor, Content, createEditor, DefaultEditorConfig } from "@blog/editor/react"
import Alert from "@/components/Alert"
import { ErrorBoundary } from "react-error-boundary"

export default function BlogEditorPreview({ value }: { value: string }) {
    return (
        <ErrorBoundary fallback={<Alert variant="error" message="Invalid Content" />}>
            <Preview value={value} />
        </ErrorBoundary>
    )
}

function Preview({ value }: { value: string }) {
    const content = JSON.parse(value)
    const editor = createEditor({ ...DefaultEditorConfig, value: content })
    return (
        <Editor readOnly={true} editor={editor}>
            <Content className="border-none bg-transparent p-0" />
        </Editor>
    )
}
