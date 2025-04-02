import React from 'react';
import { Property, useClassName } from '../../../core';
import type { SafariNodeWithChildren } from '../types';
import './Text.styles.css';

export interface TextProps extends SafariNodeWithChildren {
    bold?: boolean;
    italic?: boolean;
    variant?: 'h1' | 'h2' | 'h3' | 'text' | 'span' | 'caption' | 'JSON';
    size?: 'xsmall' | 'small' | 'regular' | 'medium' | 'large' | 'xlarge';
}

export default function Text({ children, ...props }: TextProps) {
    const className = useClassName(props, 'DigitalUi-Text');

    const tag = React.useMemo(() => {
        if (props.variant === 'text' || props.variant === undefined) {
            return 'p';
        }
        if (props.variant === 'caption' || props.variant === 'span') {
            return 'span';
        }
        return props.variant;
    }, [props.variant]);

    if (props.variant === 'JSON') {
        return <pre className={className}>{JSON.stringify(children, null, 2)}</pre>;
    }

    return React.createElement(tag, { ...Property.toHtml(props), className }, children);
}
