import { expect, test } from 'vitest';
import { isEmpty, trimSlashes } from './String';

test('String: trimSlashes(), Should remove surrounding slashes', () => {
    [
        { test: 'https://example.com/', result: 'https://example.com' },
        { test: '/auth/login', result: 'auth/login' },
        { test: '/auth/login/', result: 'auth/login' },
        { test: 'auth/login', result: 'auth/login' },
    ].forEach(({ test, result }) => expect(trimSlashes(test)).toBe(result));
});

test('String: isEmpty(), Should return true if string is empty', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(' ')).toBe(false);
    expect(isEmpty('test')).toBe(false);
    // @ts-expect-error
    expect(isEmpty(undefined)).toBe(true);
});
