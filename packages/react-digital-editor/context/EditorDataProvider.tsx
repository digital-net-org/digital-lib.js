import React, { type PropsWithChildren } from 'react';
import { EditorDataContext } from './EditorDataContext';
import { type EditorConfig } from '../config/EditorConfig';
import { type Entity } from '../../core';
import { useCrud } from '../../react-digital-client';
import { useStoredEntity } from '../../react-digital-idb';
import useEntitySelector from './useEntitySelector';

// TODO: handle on save local storage clear
export default function EditorDataProvider<T extends Entity>({ children, ...config }: PropsWithChildren<EditorConfig<T>>) {
    const { entity, entities, schema, isLoading, ...crudApi } = useCrud<T>({ endpoint: config.store });
    const { resolved, editEntity, deleteEntity, isEditing } = useStoredEntity<T>(entity, config.store);
    const { currentEntityId, setEntity } = useEntitySelector<T>({ entity, get: crudApi.get, isLoading });

    const isCurrentEntityReady = React.useMemo(
        () => currentEntityId !== undefined && currentEntityId === resolved?.id,
        [currentEntityId, resolved?.id],
    );

    const save = React.useCallback(() => {
        console.log('save', resolved?.id);
        console.log('isReady', isCurrentEntityReady);
        console.log('isEditing', isEditing);
        // @ts-ignore
        console.log('resolved-data', resolved['data']);

        if (isCurrentEntityReady && isEditing) {
            crudApi.patch(currentEntityId, resolved!);
        }
    }, [isCurrentEntityReady, isEditing, crudApi, currentEntityId, resolved]);

    const create = React.useCallback(() => {
        crudApi.create(config.onCreate());
    }, [config, crudApi]);

    const _delete = React.useCallback(() => {
        if (isCurrentEntityReady) {
            crudApi.delete(currentEntityId);
        }
    }, [isCurrentEntityReady, crudApi, currentEntityId]);

    return (
        <EditorDataContext.Provider value={{
            isLoading,
            create,
            save,
            delete: _delete,
            schema,
            entity: resolved,
            entities,
            editEntity,
            setEntity,
        }}
        >
            {children}
        </EditorDataContext.Provider>
    );
}
