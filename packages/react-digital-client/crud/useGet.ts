import React from 'react';
import { type Entity, EntityHelper, type EntityRaw, type QueryResult } from '../../core';
import useDigitalQuery from '../useDigitalQuery';
import type { CrudConfig } from './types';
import useDigitalClient from '../useDigitalClient';

export default function useGet<T extends Entity>(config: CrudConfig) {
    const { queryClient } = useDigitalClient();
    const { data, isLoading: isQuerying, refetch } = useDigitalQuery<QueryResult<EntityRaw>>(config.endpoint);

    const invalidateQuery = React.useCallback(async () => {
        await queryClient.invalidateQueries({
            predicate: query => query.queryKey[0] === config.endpoint,
        });
    }, [config.endpoint, queryClient]);

    const refetchQuery = React.useCallback(async () => {
        await invalidateQuery();
        await refetch();
    }, [invalidateQuery, refetch]);

    const entities: T[] = React.useMemo(() => (data?.value ?? []).map(EntityHelper.build<T>), [data]);

    return {
        entities,
        isQuerying,
        invalidateQuery,
        refetchQuery,
    };
}
