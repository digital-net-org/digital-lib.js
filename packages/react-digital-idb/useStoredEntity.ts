import { type Entity, ObjectMatcher } from '../core';
import useIDbStore from './useIDbStore';
import React from 'react';

/**
 * IndexedDb entity accessor hook
 * @param entity - entity to interact with
 * @param store - store name (table)
 * @returns
 *  Stored state of the entity.
 */
export default function useStoredEntity<T extends Entity>(entity: T | undefined, store: string) {
    const { stored, isLoading, ...idbStore } = useIDbStore<T>(store);

    React.useEffect(() => {
        (async () => entity?.id !== undefined && entity.id !== stored?.id
            ? idbStore.get(entity.id)
            : void 0
        )();
    }, [entity, idbStore, stored]);

    const _delete = React.useCallback(
        async () => stored?.id ? idbStore.delete(stored.id) : void 0,
        [idbStore, stored],
    );

    return {
        stored,
        ...idbStore,
        delete: _delete,
    };
}
