import React from 'react';
import type { Entity } from '../core';
import { DigitalIdbContext, type DigitalIdbContextState } from './DigitalIdbContext';
import IDbStore from './IDbStore';

/**
 * IndexedDb store accessor hook
 * @param store - store name (table)
 * @returns the store accessor methods and context
 *  - result: the entity retrieved from the store
 *  - get: retrieve an entity from the store
 *  - save: save an entity to the store
 *  - delete: delete an entity from the store
 *  - isLoading: indicates if the store is currently loading
 */
export default function useIDbStore<T extends Entity>(store: string) {
    const { database, ...context }: DigitalIdbContextState = React.useContext(DigitalIdbContext);
    const [isLoading, setIsLoading] = React.useState(false);
    const [result, setResult] = React.useState<T | undefined>();

    const get = React.useCallback(async (id: string | number | undefined) => {
        if (isLoading || !database || !id) {
            return;
        }
        setIsLoading(true);
        const result = await IDbStore.get<T>(database, store, id);
        
        setResult(result);
        setIsLoading(false);
        return result;
    }, [database, isLoading, store]);

    const save = React.useCallback(async (payload: Partial<T>) => {
        if (isLoading || !database || !payload.id) {
            return;
        }
        setIsLoading(true);
        await IDbStore.save<T>(database, store, payload);
        setResult(state => state ? ({ ...state, ...payload }) : payload as T);
        setIsLoading(false);
    }, [database, isLoading, store]);

    const _delete = React.useCallback(async (id: string | number | undefined) => {
        if (isLoading || !database || !id) {
            return;
        }
        setIsLoading(true);
        await IDbStore.delete<T>(database, store, id);
        setIsLoading(false);
    }, [database, isLoading, store]);

    return {
        stored: result,
        get,
        save,
        delete: _delete,
        isLoading: isLoading || context.isLoading,
    };
}
