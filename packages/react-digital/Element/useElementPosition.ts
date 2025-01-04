import React from 'react';
import useResizeObserver from './useResizeObserver';
import useWindow from './useWindow';

export default function useElementPosition<T extends HTMLElement>(element: T | null) {
    const [rect, setRect] = React.useState(new DOMRect());
    const windowState = useWindow();

    useResizeObserver(element, () => (element ? setRect(element.getBoundingClientRect()) : void 0));
    React.useLayoutEffect(() => (element ? setRect(element.getBoundingClientRect()) : void 0), [element, windowState]);

    return {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
    };
}
