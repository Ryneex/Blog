import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"
import fluid, { extract, screens } from "fluid-tailwind"

const config = {
    darkMode: ["class"],
    content: { files: ["./src/**/*.{ts,tsx}", "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", "./node_modules/@blog/editor/src/**/*.{ts,tsx}"], extract },
    theme: {
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
        screens,
    },
    corePlugins: {
        container: false,
    },
    plugins: [nextui(), require("@tailwindcss/typography"), fluid],
} satisfies Config

export default config
