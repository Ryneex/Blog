export function ExcludeKeys<T extends object, K extends keyof T>(obj: T, arr: K[]) {
    const result = structuredClone(obj)
    for (const key of arr) {
        delete result[key]
    }
    return result as Omit<T, K>
}
