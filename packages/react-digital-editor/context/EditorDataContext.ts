import React from 'react';
import type { Entity, EntitySchema } from '../../core';

export interface EditorDataContextState<T extends Entity> {
    entity: T | undefined;
    hasChanged: boolean;
    setEntity: (id?: Entity['id']) => void;
    editEntity: (payload: Partial<T>) => void;
    entities: T[];
    schema: EntitySchema | undefined;
    isLoading: boolean;
    save: () => void;
    create: () => void;
    delete: () => void;
}

export const defaultValues: EditorDataContextState<any> = {
    entity: undefined,
    hasChanged: false,
    setEntity: () => void 0,
    editEntity: () => void 0,
    entities: [],
    schema: [],
    isLoading: false,
    save: () => void 0,
    create: () => void 0,
    delete: () => void 0,
};

export const EditorDataContext = React.createContext<EditorDataContextState<any>>(defaultValues);
