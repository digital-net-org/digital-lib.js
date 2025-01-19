import StringMatcher from './StringMatcher';

export default class StringResolver {
    /**
     * Removes slashes from the beginning and end of the string.
     */
    public static trimSlashes(str: string): string {
        return str.replace(new RegExp('^/|/$', 'g'), '');
    }

    /**
     * Converts a string to camel case.
     */
    public static toCamelCase(str: string): string {
        if (StringMatcher.isCamelCase(str)) return str; // Already camelCase
        if (StringMatcher.isPascalCase(str)) return str[0].toLowerCase() + str.slice(1); // Pascal to camel
        if (StringMatcher.isSnakeCase(str) || StringMatcher.isUpperSnakeCase(str)) {
            return str
                .toLowerCase() // Normalize all to lowercase
                .replace(/_([a-z0-9])/g, (_, chr) => chr.toUpperCase()); // Convert snake to camel
        }
        console.warn(`StringResolver.toCamelCase(), Could not convert string to camel case: ${str}`);
        return str;
    }
}
