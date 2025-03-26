import React from 'react';
import type { Entity } from '../../dto';
import { useCreate, useDelete, useGet, useGetById, usePatch } from '../../react-digital-client';
import { useIDbStore } from '../../react-digital';
import { type PuckEditorProps } from './PuckEditor';
import usePuckUrlState from './usePuckUrlState';

export default function usePuckCrud<T extends Entity>(store: PuckEditorProps<T>['store'], onReset: () => void) {
    const { currentEntity } = usePuckUrlState();
    const iDbStore = useIDbStore<T>(store);
    const url = React.useMemo(() => `${PAGES_API_URL}/${store}`, [store]);

    const { entities, invalidateQuery: invalidateAll, ...queryApi } = useGet<T>(url);
    const { entity, isQuerying, invalidateQuery: invalidate } = useGetById<T>(url, currentEntity);

    const { create, isCreating } = useCreate<T>(url, {
        onSuccess: async () => {
            await invalidateAll();
        },
    });

    const { delete: _delete, isDeleting } = useDelete(url, {
        onSuccess: async () => {
            onReset();
            await iDbStore.delete(currentEntity);
            await invalidate();
            await invalidateAll();
        },
    });

    const { patch, isPatching } = usePatch<T>(url, {
        onSuccess: async () => {
            await iDbStore.delete(currentEntity);
            await invalidate();
            await invalidateAll();
        },
    });

    const isLoading = React.useMemo(
        () => queryApi.isQuerying || isQuerying || isCreating || isPatching || isDeleting,
        [queryApi.isQuerying, isQuerying, isCreating, isPatching, isDeleting]
    );

    return { patch, _delete, create, isLoading, entity, entities };
}
