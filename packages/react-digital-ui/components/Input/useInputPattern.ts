import React from 'react';
import type { BaseInputProps } from './types';

export interface InputPatternProps {
    pattern?: string;
}

export function useInputPattern({
    onChange,
    loading,
    required,
    pattern,
}: BaseInputProps & InputPatternProps & { onChange?: (value: string) => void }) {
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
        onChange?.(e.target.value);
    };

    return {
        handleChange,
        handleError: () => setError(true),
        handleInvalid: () => setError(true),
        error,
    };
}
