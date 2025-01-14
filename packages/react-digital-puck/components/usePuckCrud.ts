import { useCreate, useDelete, useGet, useGetById, usePatch, useSchema } from '../../react-digital-client';
import type { PuckEditorProps } from './PuckEditor';
import type { Entity } from '../../core';
import React from 'react';
import { useIDbStore } from '../../react-digital-idb';
import usePuckState from './usePuckState';
import type { Data } from '@measured/puck';

interface Props<T extends Entity> {
    store: PuckEditorProps<T>['store'];
    accessor: PuckEditorProps<T>['accessor'];
    selectedEntityId: string;
    selectEntity: (id: string | undefined) => void;
}

export default function usePuckCrud<T extends Entity>({
    store,
    accessor,
    selectedEntityId,
    selectEntity,
}: Props<T>) {
    const iDbStore = useIDbStore<T>(store);
    const [_, setPuckState] = usePuckState();
    const { entities, invalidateQuery: invalidateAll, ...queryApi } = useGet<T>(store);
    const { entity, invalidateQuery: invalidate } = useGetById<T>(store, selectedEntityId, {
        onKeyChange: async (e) => {
            const stored = await iDbStore.get(e?.id);
            setPuckState((stored?.[accessor] ?? e?.[accessor]) as Data | string, e?.id);
        },
    });

    const { create, isCreating } = useCreate<T>(store, {
        onSuccess: async () => {
            await invalidateAll();
        },
    });

    const { delete: _delete, isDeleting } = useDelete(store, {
        onSuccess: async () => {
            selectEntity(undefined);
            await iDbStore.delete(selectedEntityId);
            await invalidate();
            await invalidateAll();
        },
    });

    const { patch, isPatching } = usePatch<T>(store, {
        onSuccess: async () => {
            await iDbStore.delete(selectedEntityId);
            await invalidate();
            await invalidateAll();
        },
    });

    const isLoading = React.useMemo(
        () =>
            queryApi.isQuerying
            || isCreating
            || isPatching
            || isDeleting,
        [queryApi.isQuerying, isCreating, isPatching, isDeleting],
    );

    return { patch, _delete, create, isLoading, entity, entities };
}
