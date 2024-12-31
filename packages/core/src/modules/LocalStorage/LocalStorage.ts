import { safeParse } from "../JSON"

export default class LocalStorage {
    public static get<T>(key: string): T | undefined {
        const item = localStorage.getItem(key)
        return item ? (safeParse(item) as T) : undefined
    }

    public static set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value))
        window.dispatchEvent(new Event(`LS_SET_${key}`))
    }

    public static remove(key: string) {
        localStorage.removeItem(key)
        window.dispatchEvent(new Event(`LS_REMOVE_${key}`))
    }

    public static onSet<T>(key: string, callback: (value: T | undefined) => void) {
        window?.addEventListener?.(`LS_SET_${key}`, () => callback(LocalStorage.get<T>(key)))
    }

    public static onRemove(key: string, callback: () => void) {
        window?.addEventListener?.(`LS_REMOVE_${key}`, callback)
    }

    public static clearListeners(key: string) {
        window?.removeEventListener?.(`LS_SET_${key}`, () => {})
        window?.removeEventListener?.(`LS_REMOVE_${key}`, () => {})
    }
}