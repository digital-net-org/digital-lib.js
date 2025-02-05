import React from 'react';
import type { BaseInputProps } from './types';

export type ValidatableHTMLElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export default function useInputRef<T extends ValidatableHTMLElement>(
    {
        value,
        required,
        requiredMessage,
    }: BaseInputProps & { value?: any },
) {
    const ref = React.useRef<T>(null);
    const isValueEmpty = React.useMemo(
        () => value === '' || value === null || value === undefined, 
        [value],
    );

    React.useEffect( // Restore error state on value change
        () => ref.current?.setCustomValidity(''), 
        [value],
    );

    React.useEffect(() => { // Handle required field
        if (required && isValueEmpty)
            ref.current?.setCustomValidity(requiredMessage ?? 'This field is required');
    }, [isValueEmpty, required, requiredMessage, value]);

    return ref;
}
