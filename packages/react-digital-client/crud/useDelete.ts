import React from 'react';
import type { Entity, Result } from '../../core';
import useDigitalMutation from '../useDigitalMutation';

export default function useDelete<T extends Entity>(endpoint: string, invalidateQuery?: () => Promise<void>) {
    const { mutate, isPending: isDeleting } = useDigitalMutation<Result, { id: string }>(
        ({ id }) => `${endpoint}/${id}`,
        {
            method: 'DELETE',
            onSuccess: async () => {
                await invalidateQuery?.();
            },
        },
    );

    const _delete = React.useCallback((id: string | number) => mutate({ params: { id: String(id) } }), [mutate]);

    return {
        delete: _delete,
        isDeleting,
    };
}
