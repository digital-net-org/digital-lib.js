import ClassNameModule from './ClassName';
import { actionKeywords, booleanKeywords, excludedKeywords } from './keywords';

export const ClassName = Object.assign(ClassNameModule, {
    excludedKeywords,
    booleanKeywords,
    actionKeywords,
});

export { default as useClassName } from './useClassName';
