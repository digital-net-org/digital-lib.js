import React from 'react';
import type { SafariNodeWithChildren } from '../types';
import { useClassName } from '../../../react-elements';
import './Text.styles.css';

export interface TextProps extends SafariNodeWithChildren {
    bold?: boolean;
    italic?: boolean;
    variant?: 'h1' | 'h2' | 'h3' | 'text' | 'caption' | 'JSON';
}

export default function Text(props: TextProps) {
    const className = useClassName(props, 'SafariUi-Text');

    const tag = React.useMemo(() => {
        if (props.variant === 'text' || props.variant === undefined) {
            return 'p';
        }
        if (props.variant === 'caption') {
            return 'span';
        }
        return props.variant;
    }, [props.variant]);

    if (props.variant === 'JSON') {
        return (
            <pre className={className}>
                {JSON.stringify(props.children, null, 2)}
            </pre>
        );
    }

    return React.createElement(tag, { ...props, className }, props.children);
}
