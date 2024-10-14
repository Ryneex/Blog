"use client"

import { CodeBlockEditorProps, useCodeBlockEditorContext } from "@mdxeditor/editor"
import createTheme from "@uiw/codemirror-themes"
import CodeMirror, { EditorView } from "@uiw/react-codemirror"
import { langs } from "@uiw/codemirror-extensions-langs"
import { tags as t } from "@lezer/highlight"
import { Select, SelectItem } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { LuTrash } from "react-icons/lu"

type Languages = keyof typeof langs

export default function CodeBlock(props: CodeBlockEditorProps) {
    const { setCode, setLanguage: setMirrorLanguage, parentEditor, lexicalNode } = useCodeBlockEditorContext()

    const [language, setLanguage] = useState<string>(props.language)
    useEffect(() => {
        language && setMirrorLanguage(language)
    }, [language, setMirrorLanguage])

    const theme = createTheme({
        theme: "light",
        settings: {
            background: "transparent",
        },
        styles: [
            { tag: [t.standard(t.tagName), t.tagName], color: "#116329" },
            { tag: [t.comment, t.bracket], color: "#6a737d" },
            { tag: [t.className, t.propertyName], color: "#6f42c1" },
            { tag: [t.variableName, t.attributeName, t.number, t.operator], color: "#005cc5" },
            { tag: [t.keyword, t.typeName, t.typeOperator, t.typeName], color: "#d73a49" },
            { tag: [t.string, t.meta, t.regexp], color: "#22863a" },
            { tag: [t.name, t.quote], color: "#22863a" },
            { tag: [t.heading, t.strong], color: "#24292e", fontWeight: "bold" },
            { tag: [t.emphasis], color: "#24292e", fontStyle: "italic" },
            { tag: [t.deleted], color: "#b31d28", backgroundColor: "ffeef0" },
            { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#e36209" },
            { tag: [t.url, t.escape, t.regexp, t.link], color: "#032f62" },
            { tag: t.link, textDecoration: "underline" },
            { tag: t.strikethrough, textDecoration: "line-through" },
            { tag: t.invalid, color: "#cb2431" },
        ],
    })

    return (
        <div className="mt-5 overflow-hidden rounded-lg bg-[#005dc70d] text-[0.9rem]" onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
            <div className="flex items-center justify-between rounded-lg bg-[#005dc70d] px-2">
                <Select
                    aria-label="select-language"
                    onChange={(e) => setLanguage(e.target.value)}
                    classNames={{ trigger: "bg-transparent hover:!bg-transparent" }}
                    defaultSelectedKeys={[language || "text"]}
                    className="w-32"
                    size="sm"
                >
                    {Object.keys(langs)
                        .concat("text")
                        .sort()
                        .map((e) => (
                            <SelectItem aria-label={e} key={e}>
                                {e}
                            </SelectItem>
                        ))}
                </Select>
                <LuTrash className="size-5 cursor-pointer rounded-md p-0.5 hover:bg-gray-300" onClick={() => parentEditor.update(() => lexicalNode.remove())} />
            </div>
            <CodeMirror
                onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}
                autoFocus
                className="p-2"
                theme={theme}
                placeholder="#code"
                basicSetup={{ lineNumbers: false, foldGutter: false }}
                extensions={[EditorView.updateListener.of(({ state }) => setCode(state.doc.toString().trim())), language in langs ? langs[language as Languages]() : []]}
                value={props.code}
            />
        </div>
    )
}
