import React from 'react';
import type { Entity, Result } from '../../core';
import useDigitalMutation from '../useDigitalMutation';
import type { CrudConfig } from './types';

export default function useCreate<T extends Entity>(config: CrudConfig & { invalidateQuery: () => Promise<void> }) {
    const { mutate, isPending: isCreating } = useDigitalMutation<Result<T>>(config.endpoint, {
        onSuccess: async () => await config.invalidateQuery(),
    });

    const create = React.useCallback((body: Partial<T>) => mutate({ body }), [mutate]);

    return {
        create,
        isCreating,
    };
}
