export function SelectKeys<T extends object, K extends keyof T>(obj: T, arr: K[]) {
    const result = {} as Pick<T, K>
    for (const key of arr) {
        if (key in obj) {
            result[key] = obj[key]
        }
    }
    return result
}
