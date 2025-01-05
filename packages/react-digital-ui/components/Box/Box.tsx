import React from 'react';
import type { SafariNodeWithChildren } from '../types';
import './Box.styles.css';
import { useClassName } from '../../../react-digital';

type BaseBoxProps = React.HTMLAttributes<HTMLDivElement> & SafariNodeWithChildren;

type spacing = null | 0 | 1 | 2 | 3;

export interface BoxProps extends BaseBoxProps {
    p?: spacing;
    pt?: spacing;
    pb?: spacing;
    m?: spacing;
    mt?: spacing;
    mb?: spacing;
    gap?: spacing;
    resizable?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    wrap?: boolean;
    direction?: 'row' | 'column';
    align?: 'start' | 'center' | 'end';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    color?: string;
    overflow?: 'hidden' | 'scroll' | 'auto';
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
    (
        {
            resizable = false,
            fullWidth = false,
            fullHeight = false,
            wrap = false,
            p = null,
            m = null,
            gap = null,
            direction = 'column',
            align = 'start',
            justify = 'start',
            color,
            ...props
        }: BoxProps,
        ref,
    ) => {
        const className = useClassName(
            {
                resizable,
                fullWidth,
                fullHeight,
                wrap,
                p,
                m,
                gap,
                direction,
                align,
                justify,
                ...props,
            },
            'SafariUi-Box',
        );

        return <div {...props} style={{ backgroundColor: color }} ref={ref} className={className} />;
    },
);

export default Box;
