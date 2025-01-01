import { expect, test } from 'vitest';
import { joinTruthy } from './Array';

test('Array: safeJoin(), Should only join defined values', () => {
    expect(joinTruthy(['defined', undefined, 'values', ''])).toBe('definedvalues');
    expect(joinTruthy(['defined', 'values', { obj: 1 }], '+')).toBe('defined+values+[object Object]');
});
