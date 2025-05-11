import React from 'react';
import { type Entity, EntityHelper, type EntityRaw, type QueryResult } from '@digital-lib/dto';
import { type QueryOptions, type RequestCallbacks } from '../types';

import { DigitalClient } from '../DigitalClient';
import { useDigitalQuery } from '../useDigitalQuery';

export function useGet<T extends Entity>(endpoint: string, options?: RequestCallbacks<QueryResult<T>> & QueryOptions) {
    const { data, isLoading } = useDigitalQuery<QueryResult<EntityRaw>>(endpoint, {
        ...(options ?? {}),
        onSuccess: async e => {
            await options?.onSuccess?.({ ...e, value: e.value.map(EntityHelper.build<T>) });
        },
        onError: async e => {
            await options?.onError?.(e);
        },
    });

    const invalidateQuery = React.useCallback(() => DigitalClient.invalidate(endpoint), [endpoint]);

    const entities: T[] = React.useMemo(() => (data?.value ?? []).map(EntityHelper.build<T>), [data]);

    return {
        entities,
        isQuerying: isLoading,
        invalidateQuery,
    };
}
