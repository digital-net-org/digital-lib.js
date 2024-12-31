/**
 * Joins only truthy values from the array.
 */
export function joinTruthy<T>(array: Array<T>, separator: string = '') {
    return array.filter(Boolean).join(separator);
}
