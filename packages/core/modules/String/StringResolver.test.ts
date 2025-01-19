import { expect, test } from 'vitest';
import StringResolver from './StringResolver';

test('StringResolver.trimSlashes(), Should remove surrounding slashes', () => {
    [
        { test: 'https://example.com/', result: 'https://example.com' },
        { test: '/auth/login', result: 'auth/login' },
        { test: '/auth/login/', result: 'auth/login' },
        { test: 'auth/login', result: 'auth/login' },
    ].forEach(({ test, result }) => expect(StringResolver.trimSlashes(test)).toBe(result));
});

test('StringResolver.toCamelCase(), Should transform string in camel case', () => {
    [
        { test: 'someTest', result: 'someTest' },
        { test: 'SomeTest', result: 'someTest' },
        { test: 'some_test', result: 'someTest' },
        { test: 'SOME_TEST', result: 'someTest' },
    ].forEach(({ test, result }) => expect(StringResolver.toCamelCase(test)).toBe(result));
});
