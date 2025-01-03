import React from 'react';
import type { Entity } from '../../core';
import type { CrudConfig } from './types';
import usePatch from './usePatch';
import useCreate from './useCreate';
import useGet from './useGet';
import useDelete from './useDelete';
import useSchema from './useSchema';

export default function useCrud<T extends Entity>(config: CrudConfig) {
    const { schema } = useSchema(config);
    const { invalidateQuery, ...query } = useGet(config);
    const create = useCreate<T>({ ...config, invalidateQuery });
    const patch = usePatch<T>({ ...config, invalidateQuery });
    const remove = useDelete<T>({ ...config, invalidateQuery });

    const isLoading = React.useMemo(
        () => query.isQuerying || create.isCreating || patch.isPatching,
        [query.isQuerying, create.isCreating, patch.isPatching],
    );

    return {
        isLoading,
        schema,
        ...query,
        ...create,
        ...remove,
        ...patch,
    };
}
