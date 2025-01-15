import React from 'react';
import type { Data } from '@measured/puck';
import { useCreate, useDelete, useGet, useGetById, usePatch } from '../../react-digital-client';
import { type PuckEditorProps } from './PuckEditor';
import { type Entity } from '../../core';
import { useIDbStore } from '../../react-digital-idb';
import usePuckState from './usePuckState';
import { useUrlParams } from '../../react-digital';
import type { PuckUrlState } from '../PuckUrlState';

interface Props<T extends Entity> {
    store: PuckEditorProps<T>['store'];
    accessor: PuckEditorProps<T>['accessor'];
}

export default function usePuckCrud<T extends Entity>({
    store,
    accessor,
}: Props<T>) {
    const iDbStore = useIDbStore<T>(store);
    const [_, setPuckState] = usePuckState();
    const [urlState, setUrlState] = useUrlParams<PuckUrlState>();

    const { entities, invalidateQuery: invalidateAll, ...queryApi } = useGet<T>(store);

    const { entity, invalidateQuery: invalidate } = useGetById<T>(store, urlState.entity, {
        onKeyChange: async (e) => {
            const stored = await iDbStore.get(e?.id);
            if (!e) {
                return setUrlState(prev => ({ ...prev, entity: undefined }));
            } else {
                setPuckState((stored?.[accessor] ?? e[accessor]) as Data | string, e?.id);
            }
        },
        onError: async () => {
            setUrlState(prev => ({ ...prev, entity: undefined, tool: 'model-selector' }));
        },
    });

    const { create, isCreating } = useCreate<T>(store, {
        onSuccess: async () => {
            await invalidateAll();
        },
    });

    const { delete: _delete, isDeleting } = useDelete(store, {
        onSuccess: async () => {
            setUrlState(prev => ({ ...prev, entity: undefined, tool: undefined }));
            await iDbStore.delete(urlState.entity);
            await invalidate();
            await invalidateAll();
        },
    });

    const { patch, isPatching } = usePatch<T>(store, {
        onSuccess: async () => {
            await iDbStore.delete(urlState.entity);
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
