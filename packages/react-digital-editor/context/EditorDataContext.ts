import React from 'react';
import type { Entity, EntitySchema } from '../../core';

export interface EditorDataContextState<T extends Entity> {
    store: string;
    entity: T | undefined;
    entities: T[];
    setEntity: (id?: Entity['id']) => void;
    isLoading: boolean;
    checkEquality: (payload?: Partial<T>) => boolean;
    patch: (payload?: Partial<T>) => void;
    create: (payload?: Partial<T>) => void;
    delete: () => void;
    schema: EntitySchema | undefined;
}

export const defaultValues: EditorDataContextState<any> = {
    store: '',
    entity: undefined,
    entities: [],
    setEntity: () => void 0,
    isLoading: false,
    checkEquality: () => false,
    patch: () => void 0,
    create: () => void 0,
    delete: () => void 0,
    schema: [],
};

export const EditorDataContext = React.createContext<EditorDataContextState<any>>(defaultValues);
