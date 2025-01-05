import React, { type PropsWithChildren } from 'react';
import { EditorDataContext } from './EditorDataContext';
import type { EditorConfig } from './EditorConfig';
import type { Entity } from '../../core';
import { useCrud } from '../../react-digital-client';
import { useStoredEntity } from '../../react-digital-idb';

export default function EditorDataProvider<T extends Entity>({ children, ...config }: PropsWithChildren<EditorConfig>) {
    // const [currentEntity, setCurrentEntity] = useUrlState('model');
    const [currentEntity, setCurrentEntity] = React.useState<string>();

    const { entity, ...crudApi } = useCrud({ api: 'safari-digital', endpoint: config.store });
    const [resolved, editEntity, isEditing] = useStoredEntity(entity, config.store);

    return (
        <EditorDataContext.Provider value={{
            ...config,
            ...crudApi,
            entity: resolved,
            editEntity,
            setEntity: (id: string | number | undefined) => setCurrentEntity(id ? String(id) : undefined),
        }}
        >
            {children}
        </EditorDataContext.Provider>
    );
}
