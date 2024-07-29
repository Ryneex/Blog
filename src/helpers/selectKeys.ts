export type ISelectKeys<T extends object, K extends keyof T> = {
    [P in K]: T[P]
}

export function SelectKeys<T extends object, K extends keyof T>(obj: T, arr: K[]) {
    const result = {} as ISelectKeys<T, K>
    for (const key of arr) {
        if (key in obj) {
            result[key] = obj[key]
        }
    }
    return result
}
