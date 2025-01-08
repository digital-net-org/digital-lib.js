import React from 'react';
import { type Entity, EntityHelper, type EntityRaw, type Result } from '../../core';
import useDigitalQuery from '../useDigitalQuery';
import useDigitalClient from '../useDigitalClient';

export default function useGetById<T extends Entity>(endpoint: string, id: string | number | undefined) {
    const { queryClient } = useDigitalClient();

    const { data, isLoading, refetch } = useDigitalQuery<Result<EntityRaw>>(!id ? undefined : `${endpoint}/${id}`);
    
    const invalidateQuery = React.useCallback(async () => {
        await queryClient.invalidateQueries({
            predicate: query => query.queryKey[0] === `${endpoint}/${id}`,
        });
    }, [endpoint, id, queryClient]);
    
    const refetchQuery = React.useCallback(async () => {
        await invalidateQuery();
        await refetch();
    }, [invalidateQuery, refetch]);
    
    const entity: T | undefined = React.useMemo(
        () => data?.value ? EntityHelper.build<T>(data.value) : undefined,
        [data],
    );

    return {
        entity,
        isQuerying: isLoading,
        invalidateQuery,
        refetchQuery,
    };
}
