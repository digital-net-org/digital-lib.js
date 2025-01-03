import React from 'react';
import { type Entity, EntityHelper, type EntityRaw, type QueryResult, type Result } from '../../core';
import useDigitalQuery from '../useDigitalQuery';
import type { CrudConfig } from './types';
import useDigitalClient from '../useDigitalClient';
import useDigitalMutation from '../useDigitalMutation';

export default function useGet<T extends Entity>(config: CrudConfig) {
    const { queryClient } = useDigitalClient();

    const { data, isLoading, refetch } = useDigitalQuery<QueryResult<EntityRaw>>(config.endpoint);

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
    const [entity, setEntity] = React.useState<T>();

    const { mutate, isPending } = useDigitalMutation<Result<EntityRaw>, { id: string }>(
        ({ id }) => `${config.endpoint}/${id}`,
        {
            method: 'GET',
            onSuccess: async data => data.hasError
                ? setEntity(undefined)
                : setEntity(EntityHelper.build<T>(data.value)),
        },
    );

    const get = React.useCallback((id: string | number) => mutate({ params: { id: String(id) } }), [mutate]);

    return {
        entity,
        entities,
        get,
        isQuerying: isLoading || isPending,
        invalidateQuery,
        refetchQuery,
    };
}
