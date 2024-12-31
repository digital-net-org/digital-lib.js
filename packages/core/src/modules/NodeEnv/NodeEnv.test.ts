import { expect, test } from 'vitest';
import NodeEnv from './NodeEnv';

test('NodeEnv: get - Should return value if defined', () => {
    process.env.NODE_ENV = 'development';
    expect(NodeEnv.get('NODE_ENV')).toBe('development');
});

test('NodeEnv: get - Should return undefined if not defined', () => {
    expect(NodeEnv.get('SOME_PROBABLY_UNDEFINED_VALUE')).toBe(undefined);
});

test('NodeEnv: validate - Should throw error if key is not defined', () => {
    expect(() => NodeEnv.validate(['SOME_PROBABLY_UNDEFINED_VALUE', 'NODE_ENV'])).toThrowError(
        'Missing mandatory environment variable: SOME_PROBABLY_UNDEFINED_VALUE',
    );
});
