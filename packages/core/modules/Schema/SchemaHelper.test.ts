import { expect, test } from 'vitest';
import { SchemaHelper } from './index';

test('SchemaHelper.resolve, Should return Javascript type based on Schema types', () => {
    expect(SchemaHelper.resolve('String')).toBe('string');
    expect(SchemaHelper.resolve('bool')).toBe('boolean');
    expect(SchemaHelper.resolve('DateTime')).toBe('Date');
});

test('SchemaHelper.resolve, Should return the param unchanged if no matching types', () => {
    expect(SchemaHelper.resolve('blabla')).toBe('blabla');
});
