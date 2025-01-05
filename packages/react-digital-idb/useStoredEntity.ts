import { type Entity, ObjectMatcher } from '../core';
import useIDbStore from './useIDbStore';
import React from 'react';

/**
 * IndexedDb entity accessor hook
 * @param entity - entity to interact with
 * @param store - store name (table)
 * @returns
 *  the resolved entity (default to payload if not found in store),
 *  a setter for the entity, and a boolean indicating if the entity is being edited.
 */
export default function useStoredEntity<T extends Entity>(entity: T | undefined, store: string) {
    const dbStore = useIDbStore<T>(store);
    const storedEntity = React.useMemo(() => dbStore.result?.[0], [dbStore.result]);

    React.useEffect(() => {
        (async () => entity?.id !== undefined ? await dbStore.get(entity.id) : void 0)();
    }, [dbStore, entity?.id]);

    const isEditing = React.useMemo(
        () => ObjectMatcher.deepEquality<T>(entity, storedEntity, ['createdAt', 'updatedAt']),
        [entity, storedEntity],
    );

    const resolved = React.useMemo( // TODO: Should be able to merge and manage conflicts
        // () => EntityHelper.getLatest([entity, ...(storedEntity ? [storedEntity] : [])], 'updatedAt'),
        () => storedEntity ?? entity,
        [entity, storedEntity],
    );

    const editEntity = React.useCallback(async (payload: Partial<T>) => {
        if (resolved?.id !== undefined && !dbStore.isLoading) {
            console.log('set', { ...resolved, ...payload });
            return await dbStore.set({ ...resolved, ...payload });
        }
    },
    [dbStore, resolved]);

    return [resolved, editEntity, isEditing] as const;
}
