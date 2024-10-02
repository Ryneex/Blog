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
    CodeToggle,
    StrikeThroughSupSubToggles,
} from "@mdxeditor/editor"
import "@mdxeditor/editor/style.css"
import CodeBlock from "./CodeBlock"
import InsertImageDialog from "./InsertImageDialog"
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
                                <>
                                    <BlockTypeSelect />
                                    <BoldItalicUnderlineToggles />
                                    <Separator />
                                    <StrikeThroughSupSubToggles />
                                    <Separator />
                                    <ListsToggle />
                                    <InsertCodeBlock />
                                    <CodeToggle />
                                    <Separator />
                                    <CreateLink />
                                    <InsertImage />
                                    <InsertTable />
                                    <Separator />
                                    <InsertThematicBreak />
                                    <Separator />
                                </>
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
                    linkDialogPlugin({}),
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
