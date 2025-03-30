import React from 'react';
import useResizeObserver from './useResizeObserver';

export default function useWindow() {
    const [size, setSize] = React.useState({ width: window.innerWidth, height: window.innerHeight });
    useResizeObserver(window, size => setSize(size));
    return size;
}
