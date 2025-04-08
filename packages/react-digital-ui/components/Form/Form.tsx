import React from 'react';
import { useClassName } from '@digital-lib/core';
import { Localization } from '../../../react-digital/Localization';
import { type SafariNode } from '../types';
import { type BoxProps, Box } from '../Box';

export interface FormProps extends SafariNode, Omit<BoxProps, 'onSubmit'> {
    label?: string;
    onSubmit?: (e: React.FormEvent) => void;
}

export default function Form({
    children,
    className: propsClassName = 'DigitalUi-Form',
    id,
    onSubmit,
    ...boxProps
}: FormProps) {
    const formRef = React.useRef<HTMLFormElement>(null);
    const className = useClassName({}, propsClassName);

    const handleError = () => {
        const inputs = formRef.current?.getElementsByTagName('input');
        for (let i = 0; i < (inputs?.length ?? 0); i++) {
            let key: string | undefined;
            const input = inputs?.[i];
            if (!input || input.validity.valid) {
                continue;
            }
            if (input.validity.valueMissing) {
                key = 'required';
            }
            if (input.validity.patternMismatch) {
                key = 'pattern';
            }
            if (key) {
                input.setCustomValidity(Localization.translate(`ui-form:validity.${key}`));
                input.reportValidity();
                break;
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <Box
            element="form"
            ref={formRef}
            id={id}
            className={className}
            onSubmit={handleSubmit}
            onInvalid={handleError}
            {...boxProps}
        >
            {children}
        </Box>
    );
}
