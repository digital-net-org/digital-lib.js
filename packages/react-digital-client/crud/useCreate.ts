import React from 'react';
import type { Entity, Result } from '../../core';
import type { MutationConfig } from '../types';
import useDigitalMutation from '../useDigitalMutation';

export default function useCreate<T extends Entity>(
    endpoint: string,
    options?: {
        onSuccess?: MutationConfig<Result<T>, null>['onSuccess'];
        onError?: MutationConfig<Result<T>, null>['onError'];
    },
) {
    const { mutate, isPending: isCreating } = useDigitalMutation<Result<T>>(endpoint, {
        onSuccess: async (e) => {
            await options?.onSuccess?.(e);
        },
        onError: async (e) => {
            await options?.onError?.(e);
        },
    });

    const create = React.useCallback((body: Partial<T>) => mutate({ body }), [mutate]);

    return {
        create,
        isCreating,
    };
}
