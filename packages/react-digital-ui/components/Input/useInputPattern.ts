import React from 'react';
import type { BaseInputProps } from './types';

export interface InputPatternProps {
    pattern?: string;
    patternMessage?: string;
}

export default function useInputPattern(
    {
        onChange,
        loading,
        required,
        requiredMessage,
        pattern,
        patternMessage,
    }: BaseInputProps & InputPatternProps & { onChange?: (value: string) => void },
) {
    const [error, setError] = React.useState(false);

    const testValue = React.useCallback((value: string) => !pattern || new RegExp(pattern).test(value), [pattern]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (loading) {
            return;
        }
        const isValid = (e.target.value !== '' && testValue(e.target.value)) || (e.target.value === '' && !required);
        if (isValid) {
            setError(false);
        }
        handlePattern(e, !isValid);
        onChange?.(e.target.value);
    };

    const handlePattern = (e: React.ChangeEvent<HTMLInputElement>, error: boolean) => {
        if (error && e.target.value !== '') {
            e.target.setCustomValidity(patternMessage ?? 'Invalid input');
        } else if (required && e.target.value === '') {
            e.target.setCustomValidity(requiredMessage ?? 'This field is required');
        } else {
            e.target.setCustomValidity('');
        }
    };

    return {
        handleChange,
        handleError: () => setError(true),
        handleInvalid: () => setError(true),
        error,
    };
}
