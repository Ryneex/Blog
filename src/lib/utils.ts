export function getColorBasedOnText(text: string) {
    let hash = 0
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + hash * 3
    }
    return `hsl(${hash % 360}, 60%, 40%)`
}
