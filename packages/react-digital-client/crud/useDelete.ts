import React from 'react';
import type { Entity, Result } from '../../core';
import type { MutationConfig } from '../types';
import useDigitalMutation from '../useDigitalMutation';

export default function useDelete<T extends Entity>(
    endpoint: string,
    options?: {
        onSuccess?: MutationConfig<Result, null>['onSuccess'];
        onError?: MutationConfig<Result, null>['onError'];
    },
) {
    const { mutate, isPending: isDeleting } = useDigitalMutation<Result, { id: string }>(
        ({ id }) => `${endpoint}/${id}`,
        {
            method: 'DELETE',
            onSuccess: async (e) => {
                await options?.onSuccess?.(e);
            },
            onError: async (e) => {
                await options?.onError?.(e);
            },
        },
    );

    const _delete = React.useCallback((id: string | number) => mutate({ params: { id: String(id) } }), [mutate]);

    return {
        delete: _delete,
        isDeleting,
    };
}
