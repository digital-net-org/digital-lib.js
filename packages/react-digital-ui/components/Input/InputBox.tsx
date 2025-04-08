import React, { type PropsWithChildren } from 'react';
import { useClassName } from '@digital-lib/core';
import { Box } from '../Box';
import type { SafariNode } from '../types';
import type { InputBoxProps } from './types';
import './InputBox.styles.css';

export default function InputBox({ children, id, label, ...props }: PropsWithChildren<InputBoxProps & SafariNode>) {
    const className = useClassName(props, 'DigitalUi-InputBox');
    return (
        <Box
            id={id}
            className={className}
            direction="row"
            mt={label ? 2 : 1}
            gap={2}
            justify="space-between"
            align="center"
            fullWidth={props.fullWidth}
        >
            {label && <label className="DigitalUi-Input-label">{label}</label>}
            {children}
        </Box>
    );
}
