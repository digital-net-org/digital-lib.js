import type React from 'react';

export interface BaseInputProps {
    required?: boolean | undefined;
    loading?: boolean | undefined;
    disabled?: boolean | undefined;
}

export interface SafariNode {
    id?: string;
    className?: string;
}

export type SafariInputNode = BaseInputProps & SafariNode;

export type SafariNodeWithChildren = React.PropsWithChildren & SafariNode;

export type ControlledHandler<T> = (value: T) => void | React.Dispatch<React.SetStateAction<T>>;
