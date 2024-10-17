// Blocks
import { ParagraphPlugin } from "@udecode/plate-common/react"
import { HeadingPlugin } from "@udecode/plate-heading/react"
import { IndentListPlugin } from "@udecode/plate-indent-list/react"
import { TodoListPlugin } from "@udecode/plate-list/react"
import { CodeBlockPlugin, CodeSyntaxPlugin } from "@udecode/plate-code-block/react"
import { BlockquotePlugin } from "@udecode/plate-block-quote/react"
import { ImagePlugin } from "@udecode/plate-media/react"
import { CaptionPlugin } from "@udecode/plate-caption/react"
import { TablePlugin, TableCellPlugin, TableRowPlugin, TableCellHeaderPlugin } from "@udecode/plate-table/react"
// Element
import { HeadingElement } from "@editor/components/plate-ui/heading-element"
import { ParagraphElement } from "@editor/components/plate-ui/paragraph-element"
import { BlockquoteElement } from "@editor/components/plate-ui/blockquote-element"
import { CodeBlockElement } from "@editor/components/plate-ui/code-block-element"
import { CodeSyntaxLeaf } from "@editor/components/plate-ui/code-syntax-leaf"
import { TodoListElement } from "@editor/components/plate-ui/todo-list-element"
import { TodoLi, TodoMarker } from "@editor/components/plate-ui/indent-todo-marker-component"
import { TableElement } from "@editor/components/plate-ui/table-element"
import { TableCellElement, TableCellHeaderElement } from "@editor/components/plate-ui/table-cell-element"
import { TableRowElement } from "@editor/components/plate-ui/table-row-element"
import { ImageElement } from "@editor/components/plate-ui/image-element"

// Marks
import { BoldPlugin, CodePlugin, ItalicPlugin, StrikethroughPlugin, SubscriptPlugin, SuperscriptPlugin, UnderlinePlugin } from "@udecode/plate-basic-marks/react"
import { FontBackgroundColorPlugin, FontColorPlugin } from "@udecode/plate-font/react"
import { LinkPlugin } from "@udecode/plate-link/react"
// Elements
import { CodeLeaf } from "@editor/components/plate-ui/code-leaf"
import { LinkElement } from "@editor/components/plate-ui/link-element"
import { LinkFloatingToolbar } from "@editor/components/plate-ui/link-floating-toolbar"

// utils
import { withProps } from "@udecode/cn"
import { PlateLeaf } from "@udecode/plate-common/react"
import { HEADING_KEYS, HEADING_LEVELS } from "@udecode/plate-heading"
import { Prism } from "@editor/components/plate-ui/code-block-combobox"
import { IndentPlugin } from "@udecode/plate-indent/react"
import { ResetNodePlugin } from "@udecode/plate-reset-node/react"
import { isCodeBlockEmpty, unwrapCodeBlock, isSelectionAtCodeBlockStart } from "@udecode/plate-code-block"
import { isBlockAboveEmpty, isSelectionAtBlockStart } from "@udecode/plate-common"
import { ExitBreakPlugin, SoftBreakPlugin } from "@udecode/plate-break/react"

export const DefaultEditorConfig = {
    plugins: [
        // Blocks
        ParagraphPlugin,
        HeadingPlugin,
        BlockquotePlugin,
        IndentListPlugin.configure({
            options: {
                listStyleTypes: {
                    todo: {
                        liComponent: TodoLi,
                        markerComponent: TodoMarker,
                        type: "todo",
                    },
                },
            },
        }),
        TodoListPlugin,
        CodeBlockPlugin.configure({
            options: {
                prism: Prism,
            },
        }),
        ImagePlugin,
        CaptionPlugin,
        TablePlugin,
        TableCellHeaderPlugin,
        TableCellPlugin,
        TableRowPlugin,

        // Marks
        BoldPlugin,
        ItalicPlugin,
        StrikethroughPlugin,
        SubscriptPlugin,
        SuperscriptPlugin,
        UnderlinePlugin,
        CodePlugin,
        FontColorPlugin,
        FontBackgroundColorPlugin,
        // EmojiPlugin,
        LinkPlugin.configure({
            render: {
                afterEditable: () => <LinkFloatingToolbar />,
            },
        }),

        // utils
        IndentPlugin.configure({
            inject: {
                targetPlugins: [ParagraphPlugin.key, BlockquotePlugin.key, CodeBlockPlugin.key, ...HEADING_LEVELS],
            },
        }),

        ResetNodePlugin.configure({
            options: {
                rules: [
                    {
                        types: [BlockquotePlugin.key, TodoListPlugin.key],
                        defaultType: ParagraphPlugin.key,
                        hotkey: "Enter",
                        predicate: isBlockAboveEmpty,
                    },
                    {
                        types: [BlockquotePlugin.key, TodoListPlugin.key],
                        defaultType: ParagraphPlugin.key,
                        hotkey: "Backspace",
                        predicate: isSelectionAtBlockStart,
                    },
                    {
                        types: [CodeBlockPlugin.key],
                        defaultType: ParagraphPlugin.key,
                        onReset: unwrapCodeBlock,
                        hotkey: "Enter",
                        predicate: isCodeBlockEmpty,
                    },
                    {
                        types: [CodeBlockPlugin.key],
                        defaultType: ParagraphPlugin.key,
                        onReset: unwrapCodeBlock,
                        hotkey: "Backspace",
                        predicate: isSelectionAtCodeBlockStart,
                    },
                ],
            },
        }),
        ExitBreakPlugin.configure({
            options: {
                rules: [
                    {
                        hotkey: "mod+enter",
                    },
                    {
                        hotkey: "mod+shift+enter",
                        before: true,
                    },
                    {
                        hotkey: "enter",
                        query: {
                            start: true,
                            end: true,
                            allow: HEADING_LEVELS,
                        },
                        relative: true,
                        level: 1,
                    },
                ],
            },
        }),
        SoftBreakPlugin.configure({
            options: {
                rules: [
                    { hotkey: "shift+enter" },
                    {
                        hotkey: "enter",
                        query: {
                            allow: [CodeBlockPlugin.key, BlockquotePlugin.key, TableCellPlugin.key, TableCellHeaderPlugin.key],
                        },
                    },
                ],
            },
        }),
    ],

    override: {
        components: {
            // Blocks
            [ParagraphPlugin.key]: ParagraphElement,
            [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
            [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
            [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
            [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
            [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
            [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
            [BlockquotePlugin.key]: withProps(BlockquoteElement, { className: "pl-3" }),
            [CodeBlockPlugin.key]: CodeBlockElement,
            [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
            [TodoListPlugin.key]: TodoListElement,
            [ImagePlugin.key]: ImageElement,
            [TableCellHeaderPlugin.key]: TableCellHeaderElement,
            [TablePlugin.key]: TableElement,
            [TableCellPlugin.key]: TableCellElement,
            [TableRowPlugin.key]: TableRowElement,

            // Marks
            [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
            [ItalicPlugin.key]: withProps(PlateLeaf, { as: "i" }),
            [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
            [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
            [SubscriptPlugin.key]: withProps(PlateLeaf, { as: "sub" }),
            [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: "sup" }),
            [CodePlugin.key]: CodeLeaf,
            [LinkPlugin.key]: LinkElement,
        },
    },
}
