import React from 'react';
import { type Entity, EntityHelper, type EntityRaw, type QueryResult, type Result } from '../../core';
import useDigitalQuery from '../useDigitalQuery';
import useDigitalClient from '../useDigitalClient';

export default function useGet<T extends Entity>(endpoint: string) {
    const { queryClient } = useDigitalClient();
    const { data, isLoading, refetch } = useDigitalQuery<QueryResult<EntityRaw>>(endpoint);

    const invalidateQuery = React.useCallback(async () => {
        await queryClient.invalidateQueries({
            predicate: query => query.queryKey[0] === endpoint,
        });
    }, [endpoint, queryClient]);

    const refetchQuery = React.useCallback(async () => {
        await invalidateQuery();
        await refetch();
    }, [invalidateQuery, refetch]);

    const entities: T[] = React.useMemo(() => (data?.value ?? []).map(EntityHelper.build<T>), [data]);

    return {
        entities,
        isQuerying: isLoading,
        invalidateQuery,
        refetchQuery,
    };
}
