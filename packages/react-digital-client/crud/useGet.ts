import React from 'react';
import { type Entity, EntityHelper, type EntityRaw, type QueryResult } from '../../dto';
import { type MutationConfig } from '../types';
import useDigitalClient from '../useDigitalClient';
import useDigitalQuery from '../useDigitalQuery';

type Callback<T> = MutationConfig<QueryResult<T>, null>;

/**
 * Hook to get entities.
 * @param endpoint The API endpoint.
 * @param options The options of the hook.
 *  - `onSuccess` The callback to be called on fetch success.
 *  - `onError` The callback to be called on fetch error.
 */
export default function useGet<T extends Entity>(
    endpoint: string,
    options?: {
        onSuccess?: Callback<T>['onSuccess'];
        onError?: Callback<T>['onError'];
    }
) {
    const { queryClient } = useDigitalClient();
    const { data, isLoading } = useDigitalQuery<QueryResult<EntityRaw>>(endpoint, {
        onSuccess: async e => {
            await options?.onSuccess?.({ ...e, value: e.value.map(EntityHelper.build<T>) });
        },
        onError: async e => {
            await options?.onError?.(e);
        },
    });

    const invalidateQuery = React.useCallback(async () => {
        await queryClient.invalidateQueries({
            predicate: query => query.queryKey[0] === endpoint,
        });
    }, [endpoint, queryClient]);

    const entities: T[] = React.useMemo(() => (data?.value ?? []).map(EntityHelper.build<T>), [data]);

    return {
        entities,
        isQuerying: isLoading,
        invalidateQuery,
    };
}
