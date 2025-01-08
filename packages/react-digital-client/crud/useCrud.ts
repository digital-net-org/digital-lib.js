import React from 'react';
import type { Entity } from '../../core';
import usePatch from './usePatch';
import useCreate from './useCreate';
import useGet from './useGet';
import useDelete from './useDelete';
import useSchema from './useSchema';

export default function useCrud<T extends Entity>(endpoint: string) {
    const { schema, isLoading: isSchemaLoading } = useSchema(endpoint);
    const { invalidateQuery, ...queryApi } = useGet<T>(endpoint);
    const createApi = useCreate<T>(endpoint, invalidateQuery);
    const deleteApi = useDelete<T>(endpoint, invalidateQuery);
    const patchApi = usePatch<T>(endpoint, invalidateQuery);

    const isLoading = React.useMemo(
        () =>
            queryApi.isQuerying
            || createApi.isCreating
            || patchApi.isPatching
            || deleteApi.isDeleting
            || isSchemaLoading,
        [queryApi.isQuerying, createApi.isCreating, patchApi.isPatching, deleteApi.isDeleting, isSchemaLoading],
    );

    return {
        isLoading,
        schema,
        isSchemaLoading,
        ...queryApi,
        ...createApi,
        ...deleteApi,
        ...patchApi,
    };
}
