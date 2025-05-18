import React from 'react';
import { EntityHelper, type Entity, type EntityRaw, type QueryResult } from '@digital-lib/dto';
import { type QueryOptions, type RequestCallbacks } from '../types';
import { DigitalClient } from '../DigitalClient';
import { useDigitalQuery } from '../useDigitalQuery';

export function useGet<T extends Entity>(endpoint: string, options?: RequestCallbacks<QueryResult<T>> & QueryOptions) {
    const [entities, setEntities] = React.useState<T[]>([]);

    const { isLoading } = useDigitalQuery<QueryResult<EntityRaw>>(endpoint, {
        ...(options ?? {}),
        onSuccess: async e => {
            const result = { ...e, value: e.value.map(EntityHelper.build<T>) };
            setEntities(result.value);
            await options?.onSuccess?.(result);
        },
        onError: async e => {
            await options?.onError?.(e);
        },
    });

    const invalidateQuery = React.useCallback(() => DigitalClient.invalidate(endpoint), [endpoint]);

    return {
        entities,
        isQuerying: isLoading,
        invalidateQuery,
    };
}
