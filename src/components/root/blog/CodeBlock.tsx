import { getSingletonHighlighter, ThemeInput } from "shiki"

export default async function CodeBlock({ code, language }: { code: string; language: string }) {
    const theme: ThemeInput = {
        name: "custom-theme",
        type: "light",
        colors: {
            "editor.foreground": "oklch(37.53% 0 0)",
            "editor.background": "transparent",
            "editorCursor.foreground": "oklch(56.45% 0.163 253.27)",
            "editor.lineHighlightBackground": "oklch(73.8% 0 0)",
            "editor.selectionBackground": "oklch(56.8% 0.2 26.41)",
        },
        tokenColors: [
            {
                scope: ["constant", "variable.constant"],
                settings: {
                    foreground: "oklch(56.45% 0.163 253.27)",
                },
            },
            {
                scope: ["string", "string.template"],
                settings: {
                    foreground: "oklch(54.64% 0.144 147.32)",
                },
            },
            {
                scope: ["comment", "punctuation.definition.comment"],
                settings: {
                    foreground: "oklch(73.8% 0 0)",
                },
            },
            {
                scope: ["keyword", "storage.type"],
                settings: {
                    foreground: "oklch(56.8% 0.2 26.41)",
                },
            },
            {
                scope: ["variable.parameter"],
                settings: {
                    foreground: "oklch(77.03% 0.174 64.05)",
                },
            },
            {
                scope: ["entity.name.function"],
                settings: {
                    foreground: "oklch(50.15% 0.188 294.99)",
                },
            },
            {
                scope: ["punctuation"],
                settings: {
                    foreground: "oklch(24.78% 0 0)",
                },
            },
            {
                scope: ["markup.underline.link"],
                settings: {
                    foreground: "oklch(54.64% 0.144 147.32)",
                },
            },
        ],
    }

    const highlighter = await getSingletonHighlighter({ langs: [language], themes: ["github-light", theme] })
    const html = highlighter.codeToHtml(code, { lang: language, theme: "custom-theme" })
    return <div className="mt-5 overflow-hidden rounded-lg bg-[#005dc70d] p-3 text-[1rem]" dangerouslySetInnerHTML={{ __html: html }}></div>
}
