import React, { type PropsWithChildren } from 'react';
import { EditorDataContext } from './EditorDataContext';
import { type EditorConfig } from '../config/EditorConfig';
import { type Entity } from '../../core';
import { useCrud, useGetById } from '../../react-digital-client';
import { useStoredEntity } from '../../react-digital-idb';
import { useUrlState } from '../../react-digital';

// TODO: handle on save local storage clear
export default function EditorDataProvider<T extends Entity>({ children, ...config }: PropsWithChildren<EditorConfig<T>>) {
    const [currentEntityId, setCurrentEntityId] = useUrlState('entity');
    const { entity } = useGetById<T>(config.store, currentEntityId);
    const { entities, schema, isLoading, ...crudApi } = useCrud<T>(config.store);
    const { resolved, editEntity, deleteEntity, hasChanged } = useStoredEntity<T>(entity, config.store);

    const isCurrentEntityReady = React.useMemo(
        () => currentEntityId !== undefined && currentEntityId === resolved?.id,
        [currentEntityId, resolved?.id],
    );

    const save = React.useCallback(() => {
        console.log('save', resolved?.id);
        console.log('isReady', isCurrentEntityReady);
        console.log('isEditing', hasChanged);
        // @ts-ignore
        console.log('resolved-data', resolved['data']);

        if (isCurrentEntityReady && hasChanged) {
            crudApi.patch(currentEntityId, resolved!);
        }
    }, [isCurrentEntityReady, hasChanged, crudApi, currentEntityId, resolved]);

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
            hasChanged,
            entities,
            editEntity,
            setEntity: setCurrentEntityId,
        }}
        >
            {children}
        </EditorDataContext.Provider>
    );
}
