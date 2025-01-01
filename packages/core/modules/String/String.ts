/**
 * Removes slashes from the beginning and end of the string.
 */
export function trimSlashes(str: string) {
    return str.replace(new RegExp('^/|/$', 'g'), '');
}

export function isEmpty(str: string) {
    /**
     * Checks if the string is empty.
     */
    return !str || str.length === 0;
}
