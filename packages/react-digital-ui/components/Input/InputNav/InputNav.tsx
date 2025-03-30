import React from 'react';
import { useClassName } from '../../../../core';
import { Button } from '../../Button';
import { type BoxProps, Box } from '../../Box';
import './InputNav.styles.css';

export interface InputNavProps extends Omit<BoxProps, 'onSelect' | 'children'> {
    options: Array<string>;
    value?: string;
    textDirection?: 'left' | 'right';
    onSelect?: (value: string) => void;
    onRender?: (value: string) => React.ReactNode;
}

export interface NavItem {
    label: React.ReactNode;
}

export default function InputNav({ options, textDirection, onRender, onSelect, value, ...boxProps }: InputNavProps) {
    const className = useClassName({ textDirection }, 'DigitalUi-InputNav');

    return (
        <Box {...boxProps} className={className}>
            {options.map(str => (
                <Button
                    key={str}
                    variant="text"
                    selected={str === value}
                    align={textDirection ?? 'left'}
                    onClick={() => (str !== value ? onSelect?.(str) : void 0)}
                    fullWidth
                >
                    {onRender?.(str) ?? str}
                </Button>
            ))}
        </Box>
    );
}
