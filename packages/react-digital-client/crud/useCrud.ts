import React from 'react';
import type { Entity } from '../../core';
import type { CrudConfig } from './types';
import usePatch from './usePatch';
import useCreate from './useCreate';
import useGet from './useGet';
import useDelete from './useDelete';
import useSchema from './useSchema';

export default function useCrud<T extends Entity>(config: CrudConfig) {
    const { schema, isLoading: isSchemaLoading } = useSchema(config);
    const { invalidateQuery, ...queryApi } = useGet<T>(config);
    const createApi = useCreate<T>({ ...config, invalidateQuery });
    const deleteApi = useDelete<T>({ ...config, invalidateQuery });
    const patchApi = usePatch<T>({ ...config, invalidateQuery });

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
