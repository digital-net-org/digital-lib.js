import React from 'react';
import type { Entity } from '../../../core';
import { IdbContext, type IdbContextState } from './IdbContext';
import IDbStore from '../IDbStore';

/**
 * IndexedDb store accessor hook
 * @param store - store name (table)
 * @returns a setter and getter for the store, and the current state of the store (loading, result)
 */
export default function useIDbStore<T extends Entity>(store: string) {
    const { setIsLoading, ...context }: IdbContextState = React.useContext(IdbContext);
    const [result, setResult] = React.useState<Array<T> | undefined>(undefined);

    const get = React.useCallback(async (id: string | number) => {
        if (context.isLoading) {
            return;
        }
        setIsLoading(true);
        await IDbStore.get<T>(context, store, id, {
            onSuccess: data => setResult(data ? [data] : []),
            onError: error => console.error(error),
            onResolve: () => setIsLoading(false),
        });
    }, [context, setIsLoading, store]);

    const set = React.useCallback(async (data: Partial<T>) => {
        if (context.isLoading) {
            return;
        }
        setIsLoading(true);
        await IDbStore.save<T>(context, store, data, {
            onSuccess: data => setResult(data ? [data] : []),
            onError: error => console.error(error),
            onResolve: () => setIsLoading(false),
        });
    }, [context, setIsLoading, store]);

    return {
        ...context,
        result,
        get,
        set,
    };
}
