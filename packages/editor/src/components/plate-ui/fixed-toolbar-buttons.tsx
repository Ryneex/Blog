import { BoldPlugin, CodePlugin, ItalicPlugin, StrikethroughPlugin, SubscriptPlugin, SuperscriptPlugin, UnderlinePlugin } from "@udecode/plate-basic-marks/react"
import { FontBackgroundColorPlugin, FontColorPlugin } from "@udecode/plate-font/react"
import { focusEditor, useEditorRef } from "@udecode/plate-common/react"

import { Icons } from "@editor/components/icons"

import { InsertDropdownMenu } from "./insert-dropdown-menu"
import { MarkToolbarButton } from "./mark-toolbar-button"
import { ToolbarButton } from "./toolbar"
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu"
import { ColorDropdownMenu } from "./color-dropdown-menu"
import { IndentListToolbarButton } from "./indent-list-toolbar-button"
import { ListStyleType } from "@udecode/plate-indent-list"
import { IndentTodoToolbarButton } from "./indent-todo-toolbar-button"
import { LinkToolbarButton } from "./link-toolbar-button"
import { TableDropdownMenu } from "./table-dropdown-menu"
import { EmojiDropdownMenu } from "./emoji-dropdown-menu"
import { CodeBlockPlugin } from "@udecode/plate-code-block/react"
import { ImageToolbarButton } from "@editor/components/image-toolbar-button"
import { Separator as BaseSeparator } from "./separator"
import { withProps } from "@udecode/cn"
import { insertEmptyCodeBlock } from "@udecode/plate-code-block"

const Separator = withProps(BaseSeparator, {
    className: "my-auto h-7 mx-1.5",
    orientation: "vertical",
})

export function FixedToolbarButtons() {
    const editor = useEditorRef()
    return (
        <div className="w-full overflow-hidden">
            <div
                className="flex flex-wrap items-center"
                style={{
                    transform: "translateX(calc(-1px))",
                }}
            >
                <InsertDropdownMenu />
                <TurnIntoDropdownMenu />

                <Separator />

                <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
                    <Icons.bold />
                </MarkToolbarButton>
                <MarkToolbarButton nodeType={ItalicPlugin.key} tooltip="Italic (⌘+I)">
                    <Icons.italic />
                </MarkToolbarButton>
                <MarkToolbarButton nodeType={UnderlinePlugin.key} tooltip="Underline (⌘+U)">
                    <Icons.underline />
                </MarkToolbarButton>

                <Separator />

                <MarkToolbarButton nodeType={StrikethroughPlugin.key} tooltip="Strikethrough (⌘+⇧+M)">
                    <Icons.strikethrough />
                </MarkToolbarButton>
                <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Code (⌘+E)">
                    <Icons.code />
                </MarkToolbarButton>

                <Separator />

                <ColorDropdownMenu nodeType={FontColorPlugin.key} tooltip="Text Color">
                    <Icons.color />
                </ColorDropdownMenu>
                <ColorDropdownMenu nodeType={FontBackgroundColorPlugin.key} tooltip="Text Color">
                    <Icons.bg />
                </ColorDropdownMenu>
                <MarkToolbarButton nodeType={SuperscriptPlugin.key} tooltip="Superscript">
                    <Icons.subscript></Icons.subscript>
                </MarkToolbarButton>
                <MarkToolbarButton nodeType={SubscriptPlugin.key} tooltip="Subscript">
                    <Icons.subscript></Icons.subscript>
                </MarkToolbarButton>

                <Separator />

                <IndentListToolbarButton />
                <IndentListToolbarButton nodeType={ListStyleType.Decimal} />
                <IndentTodoToolbarButton />

                <Separator />

                <LinkToolbarButton />
                <ToolbarButton
                    onClick={() => {
                        focusEditor(editor)
                        insertEmptyCodeBlock(editor)
                    }}
                >
                    <Icons.code2 />
                </ToolbarButton>
                <TableDropdownMenu />
                <ImageToolbarButton />
                <EmojiDropdownMenu />
            </div>
        </div>
    )
}
