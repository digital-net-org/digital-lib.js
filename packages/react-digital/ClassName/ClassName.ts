import { StringMatcher } from '../../core';
import { actionKeywords, booleanKeywords, excludedKeywords } from './keywords';

/**
 * Resolve props to class names
 */
const resolveProps = (baseClass: string, props: Record<string, any>) => {
    const returnReduced = (acc: string, resolved: string) =>
        StringMatcher.isEmpty(acc) ? resolved : `${acc} ${resolved}`;

    const resolved = Object.keys(props).reduce((acc, key) => {
        if (
            !props[key] ||
            (typeof props[key] === 'string' && StringMatcher.isEmpty(props[key])) ||
            excludedKeywords.has(key) ||
            key.startsWith('aria') ||
            key.startsWith('data')
        ) {
            return acc;
        }
        if (key === 'className' || key === 'class') {
            return returnReduced(acc, props[key]);
        }
        if (actionKeywords.has(key) && typeof props[key] === 'function') {
            return returnReduced(acc, [baseClass, 'action'].join('-'));
        }
        if (booleanKeywords.has(key) && props[key] === true) {
            return returnReduced(acc, [baseClass, key].join('-'));
        }
        if (typeof props[key] === 'string' || typeof props[key] === 'number') {
            return returnReduced(acc, [baseClass, key, props[key]].join('-'));
        }
        return acc;
    }, '');

    return StringMatcher.isEmpty(resolved) ? baseClass : `${baseClass} ${resolved}`;
};

export default { resolveProps };
