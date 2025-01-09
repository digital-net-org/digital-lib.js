import React, { type PropsWithChildren } from 'react';
import { EditorDataContext } from './EditorDataContext';
import { type EditorConfig } from '../config/EditorConfig';
import { type Entity, ObjectMatcher } from '../../core';
import { useCrud, useGetById } from '../../react-digital-client';
import { useUrlState } from '../../react-digital';

export default function EditorDataProvider<T extends Entity>({ children, ...config }: PropsWithChildren<EditorConfig<T>>) {
    const [currentEntityId, setCurrentEntityId] = useUrlState('entity');
    const { entity } = useGetById<T>(config.store, currentEntityId);
    const crudApi = useCrud<T>(config.store);
    
    const crudActionEnabled = React.useMemo(
        () => (currentEntityId && currentEntityId === entity?.id) && !crudApi.isLoading, 
        [currentEntityId, entity, crudApi.isLoading],
    );

    const checkEquality = React.useCallback(
        (payload?: Partial<T>) => ObjectMatcher.deepEquality<T>(entity, payload, ['createdAt', 'updatedAt']),
        [entity],
    );

    const create = React.useCallback(
        async (payload?: Partial<T>) => crudActionEnabled ? crudApi.create(payload ?? {}) : void 0,
        [crudApi, crudActionEnabled],
    );
    
    const patch = React.useCallback(
        async (payload?: Partial<T>) => crudActionEnabled ? crudApi.patch(currentEntityId, payload ?? {}) : void 0,
        [currentEntityId, crudApi, crudActionEnabled],
    );

    const _delete = React.useCallback(
        async () => crudActionEnabled ? crudApi.delete(currentEntityId) : void 0,
        [currentEntityId, crudApi, crudActionEnabled],
    );
    
    return (
        <EditorDataContext.Provider value={{
            store: config.store,
            checkEquality,
            ...crudApi,
            create,
            patch,
            delete: _delete,
            entity,
            setEntity: setCurrentEntityId,
        }}
        >
            {children}
        </EditorDataContext.Provider>
    );
}
