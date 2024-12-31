/**
 * Get the value of an environment variable
 * @param key
 * @returns The value of the environment variable.
 *
 * @example
 * ```ts
 * NodeEnv.get('NODE_ENV')
 * // returns 'development'
 * ```
 */
const get = (key: string) =>
    // @ts-expect-error
    process?.env?.[key] ?? import.meta?.env?.[key];

/**
 * Check if the environment is development
 * @returns True if the environment is development.
 */
const isDevelopment = () => get('NODE_ENV') === 'development';

/**
 * Check if the environment is production
 * @returns True if the environment is production.
 */
const isProduction = () => get('NODE_ENV') === 'production';

/**
 * Check if the environment is test
 * @returns True if the environment is test.
 */
const isTest = () => get('NODE_ENV') === 'test';

/**
 * Validate the existence of environment variables
 * @param keys - The keys to validate.
 * @throws Error if any of the keys are not defined.
 *
 * @example
 * ```ts
 * NodeEnv.validate(['NODE_ENV'])
 * ```
 */
const validate = (keys: Array<string>) => {
    for (const key of keys) if (!get(key)) throw new Error(`Missing mandatory environment variable: ${key}`);
};

export default { get, isDevelopment, isProduction, isTest, validate };
