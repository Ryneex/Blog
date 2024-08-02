"use client"

import CoverImage from "@/components/CoverImage"
import EditorText from "@/components/EditorText"
import { store } from "@/store/store"
import { BlockNoteView } from "@blocknote/mantine"
import { ErrorBoundary } from "react-error-boundary"
import { useCreateBlockNote } from "@blocknote/react"
import { User } from "@nextui-org/react"
import { blog } from "@prisma/client"
import { DateTime } from "luxon"
import { useSnapshot } from "valtio"
import Alert from "@/components/Alert"

export default function BlogPreview({ data }: { data: blog }) {
    const { user } = useSnapshot(store)

    return (
        <div className="mx-auto mt-10 flex max-w-4xl flex-col overflow-hidden rounded-md bg-transparent pb-5">
            {user && <User className="mb-3 mr-auto" name={user.name} description={DateTime.fromJSDate(data.createdAt).toFormat("dd LLL yyyy")} avatarProps={{ src: user.avatar_url ?? undefined }} />}
            <div className="relative aspect-[10/4] shrink-0 overflow-hidden">
                <CoverImage isPreview src={data.cover_url} />
            </div>
            <EditorText className="px-1" isPreview initialValue={data.title} variant="heading" />
            <EditorText className="px-1" isPreview initialValue={data.description} variant="paragraph" />
            <ErrorBoundary FallbackComponent={InvalidContent}>
                <style dangerouslySetInnerHTML={{ __html: `.bn-editor{padding-left:4px; padding-right:4px;}` }}></style>
                <BlockNote content={data.content} />
            </ErrorBoundary>
        </div>
    )
}

function InvalidContent() {
    return <Alert className="mt-5" message="Invalid Content" variant="error" />
}

function BlockNote({ content }: { content: string }) {
    const blocknote = useCreateBlockNote({
        initialContent: JSON.parse(content),
    })
    return <BlockNoteView editable={false} theme="light" editor={blocknote} />
}
