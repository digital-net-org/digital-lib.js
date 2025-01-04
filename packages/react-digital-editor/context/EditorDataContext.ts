import React from 'react';
import type { Entity, EntitySchema } from '../../core';
import type { CrudApiState } from '../../react-digital-client';
import type { EditorConfig } from './EditorConfig';

export interface EditorDataContextState<T extends Entity> extends EditorConfig, CrudApiState<T> {
    entity: T | undefined;
    setEntity: (id?: Entity['id']) => void;
    editEntity: (payload: Partial<T>) => void;
    entities: T[];
    schema: EntitySchema | undefined;
}

export const defaultValues: EditorDataContextState<any> = {
    isLoading: false,
    isCreating: false,
    isDeleting: false,
    isPatching: false,
    isQuerying: false,
    isSchemaLoading: false,
    get: () => void 0,
    patch: () => void 0,
    delete: () => void 0,
    create: () => void 0,
    refetchQuery: async () => void 0,
    schema: [],
    store: '',
    entity: undefined,
    setEntity: () => void 0,
    editEntity: () => void 0,
    entities: [],
};

export const EditorDataContext = React.createContext<EditorDataContextState<any>>(defaultValues);
