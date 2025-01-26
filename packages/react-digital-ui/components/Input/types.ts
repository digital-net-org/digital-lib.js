import type { SafariNode } from '../types';

export interface BaseInputProps {
    required?: boolean | undefined;
    requiredMessage?: string;
    loading?: boolean | undefined;
    disabled?: boolean | undefined;
    name?: string;
}

export interface InputBoxProps {
    fullWidth?: boolean | undefined;
    borderless?: boolean | undefined;
    error?: boolean | undefined;
    selected?: boolean | undefined;
    label?: string;
}

export type SafariInputNode = BaseInputProps & InputBoxProps & SafariNode;
