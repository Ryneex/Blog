import type { ReactNode } from "react"

import type { UseEmojiPickerType } from "@udecode/plate-emoji/react"

export type EmojiPickerSearchBarProps = {
    children: ReactNode
} & Pick<UseEmojiPickerType, "i18n" | "searchValue" | "setSearch">

export function EmojiPickerSearchBar({ children, i18n, searchValue, setSearch }: EmojiPickerSearchBarProps) {
    return (
        <div className="flex items-center px-2">
            <div className="relative flex grow items-center">
                <input
                    className="block w-full appearance-none rounded-full border-0 bg-slate-100 px-10 py-2 text-sm outline-none placeholder:text-slate-500 focus-visible:outline-none dark:bg-slate-800 dark:placeholder:text-slate-400"
                    value={searchValue}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={i18n.search}
                    aria-label="Search"
                    autoComplete="off"
                    type="text"
                />
                {children}
            </div>
        </div>
    )
}
