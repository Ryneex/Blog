"use client"

import {
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    BoldItalicUnderlineToggles,
    ListsToggle,
    BlockTypeSelect,
    InsertImage,
    imagePlugin,
    CreateLink,
    linkPlugin,
    linkDialogPlugin,
    InsertTable,
    tablePlugin,
    InsertThematicBreak,
    Separator,
    codeBlockPlugin,
    InsertCodeBlock,
    MDXEditorMethods,
} from "@mdxeditor/editor"
import "@mdxeditor/editor/style.css"
import CodeBlock from "./CodeBlock"
import InsertImageDialog from "./InsertImageDialog"
import { MdContentPasteGo } from "react-icons/md"
import { memo, useRef } from "react"

function MdxEditor({ content, onValueChange }: { content: string; onValueChange: (value: string) => unknown }) {
    const mdxEditor = useRef<MDXEditorMethods>(null)
    return (
        <div className="prose max-w-none rounded-md border prose-h1:font-bold">
            <MDXEditor
                ref={mdxEditor}
                markdown={content}
                placeholder="body"
                onChange={onValueChange}
                plugins={[
                    toolbarPlugin({
                        toolbarContents: () => {
                            return (
                                <div className="flex w-full items-center">
                                    <BlockTypeSelect />
                                    <BoldItalicUnderlineToggles />
                                    <Separator />
                                    <ListsToggle />
                                    <InsertCodeBlock />
                                    <Separator />
                                    <CreateLink />
                                    <InsertImage />
                                    <InsertTable />
                                    <Separator />
                                    <InsertThematicBreak />
                                    <Separator />
                                    <MdContentPasteGo
                                        onClick={async () => {
                                            mdxEditor.current?.setMarkdown(await navigator.clipboard.readText())
                                        }}
                                        size={22}
                                        className="ml-auto"
                                    />
                                </div>
                            )
                        },
                    }),
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    markdownShortcutPlugin(),
                    imagePlugin({
                        ImageDialog: InsertImageDialog,
                    }),
                    linkPlugin(),
                    linkDialogPlugin({ onClickLinkCallback: () => {} }),
                    tablePlugin(),
                    thematicBreakPlugin(),
                    codeBlockPlugin({
                        codeBlockEditorDescriptors: [
                            {
                                match: () => true,
                                priority: 0,
                                Editor: CodeBlock,
                            },
                        ],
                    }),
                ]}
            />
        </div>
    )
}

export default memo(MdxEditor)
