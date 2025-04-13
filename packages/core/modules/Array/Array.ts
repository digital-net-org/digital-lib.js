/**
 * Joins only truthy values from the array.
 */
export function joinTruthy<T>(array: Array<T>, separator: string = '') {
    return array.filter(Boolean).join(separator);
}

export function generateArray<T>(length: number, resolver: (index: number) => T): T[] {
    return Array.from({ length }, (_, i) => resolver(i));
}
