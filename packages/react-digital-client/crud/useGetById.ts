import React from 'react';
import { type Entity, EntityHelper, type EntityRaw, type Result } from '@digital-lib/dto';
import type { RequestCallbacks } from '../types';
import { DigitalClient } from '../DigitalClient';
import { useDigitalQuery } from '../useDigitalQuery';

/**
 * Hook to get an entity by its id.
 * @param endpoint The API endpoint.
 * @param id The id of the entity.
 * @param options The options of the hook.
 *  - `onSuccess` The callback to be called on fetch success.
 *  - `onError` The callback to be called on fetch error.
 */
export function useGetById<T extends Entity>(
    endpoint: string,
    id: string | number | undefined,
    options?: RequestCallbacks<Result<T>>
) {
    const { data, isLoading } = useDigitalQuery<Result<EntityRaw>>(!id ? undefined : `${endpoint}/${id}`, {
        onSuccess: async e => {
            await options?.onSuccess?.({ ...e, value: EntityHelper.build<T>(e.value) });
        },
        onError: async e => {
            await options?.onError?.(e);
        },
    });

    const entity = React.useMemo(() => (data?.value ? EntityHelper.build<T>(data.value) : undefined), [data]);

    const invalidateQuery = React.useCallback(() => DigitalClient.invalidate(`${endpoint}/${id}`), [endpoint, id]);

    return {
        entity,
        isQuerying: isLoading,
        invalidateQuery,
    };
}
