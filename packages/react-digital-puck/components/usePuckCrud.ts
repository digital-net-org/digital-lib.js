import React from 'react';
import { useCreate, useDelete, useGet, useGetById, usePatch } from '../../react-digital-client';
import { type Entity } from '../../core';
import { useIDbStore } from '../../react-digital-idb';
import { type PuckEditorProps } from './PuckEditor';
import usePuckState from './usePuckState';

interface Props<T extends Entity> {
    store: PuckEditorProps<T>['store'];
    accessor: PuckEditorProps<T>['accessor'];
    onReset: () => void;
    currentEntity: string | undefined;
}

export default function usePuckCrud<T extends Entity>({
    store,
    accessor,
    currentEntity,
    onReset,
}: Props<T>) {
    const iDbStore = useIDbStore<T>(store);
    const [puckState, setPuckState] = usePuckState();

    const { entities, invalidateQuery: invalidateAll, ...queryApi } = useGet<T>(store);
    const { entity, isQuerying, invalidateQuery: invalidate } = useGetById<T>(store, currentEntity, {
        onError: async () => {
            setPuckState(undefined);
            onReset();
        },
    });
    
    React.useEffect(() => {
        (async () => {
            if (isQuerying || iDbStore.isLoading) {
                return;
            }
            if (!entity?.id && puckState.id) {
                console.log('%c reset puck state', 'color: red');
                return setPuckState(undefined);
            }
            if (entity && entity.id !== puckState.id) {
                console.log('%c set puck state', 'color: green');
                const stored = await iDbStore.get(entity?.id);
                setPuckState(stored?.[accessor] ?? entity[accessor], entity.id);
            }
        })();
    }, [accessor, entity, iDbStore, isQuerying, puckState.id, setPuckState]);

    const { create, isCreating } = useCreate<T>(store, {
        onSuccess: async () => {
            await invalidateAll();
        },
    });

    const { delete: _delete, isDeleting } = useDelete(store, {
        onSuccess: async () => {
            onReset();
            await iDbStore.delete(currentEntity);
            await invalidate();
            await invalidateAll();
        },
    });

    const { patch, isPatching } = usePatch<T>(store, {
        onSuccess: async () => {
            await iDbStore.delete(currentEntity);
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
