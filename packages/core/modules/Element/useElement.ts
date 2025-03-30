import React from 'react';
import useElementSpacing from './useElementSpacing';
import useElementPosition from './useElementPosition';

export default function useElement<T extends HTMLElement>(element: React.RefObject<T> | HTMLElement | string | null) {
    const [state, setState] = React.useState<T | null>(null);

    React.useLayoutEffect(() => {
        if (!element) {
            return;
        } else if (typeof element === 'string') {
            return setState(document.getElementById(element) as T);
        } else if (element instanceof HTMLElement) {
            setState(element as T);
        } else {
            setState(element.current);
        }
    }, [element]);

    const mutateStyle = React.useCallback(
        (style: Partial<CSSStyleDeclaration>) => (state ? Object.assign(state.style, style) : void 0),
        [state]
    );

    const spacingState = useElementSpacing(state);
    const rectState = useElementPosition(state);

    return {
        id: state?.id,
        className: state?.className,
        getChildren: () => state?.children ?? [],
        mutateStyle,
        ...spacingState,
        ...rectState,
    };
}
