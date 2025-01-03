import React from 'react';
import type { Entity, Result } from '../../core';
import useDigitalMutation from '../useDigitalMutation';
import type { CrudConfig } from './types';

export default function useDelete<T extends Entity>(config: CrudConfig & { invalidateQuery: () => Promise<void> }) {
    const { mutate, isPending: isDeleting } = useDigitalMutation<Result, { id: string }>(
        ({ id }) => `${config.endpoint}/${id}`,
        {
            method: 'DELETE',
            onSuccess: async () => await config.invalidateQuery(),
        },
    );

    const _delete = React.useCallback((id: string | number) => mutate({ params: { id: String(id) } }), [mutate]);

    return {
        delete: _delete,
        isDeleting,
    };
}
