import React from 'react';
import type { Entity, Result } from '../../dto';
import type { MutationConfig } from '../types';
import useDigitalMutation from '../useDigitalMutation';

type Callback<T> = MutationConfig<Result<T>, null>;

/**
 * Hook to create entities.
 * @param endpoint The API endpoint.
 * @param options The options of the hook.
 *  - `onSuccess` The callback to be called on create success.
 *  - `onError` The callback to be called on create error.
 */
export default function useCreate<T extends Entity>(
    endpoint: string,
    options?: {
        onSuccess?: Callback<T>['onSuccess'];
        onError?: Callback<T>['onError'];
    }
) {
    const { mutate, isPending: isCreating } = useDigitalMutation<Result<T>>(endpoint, {
        onSuccess: async e => {
            await options?.onSuccess?.(e);
        },
        onError: async e => {
            await options?.onError?.(e);
        },
    });

    const create = React.useCallback((body: Partial<T>) => mutate({ body }), [mutate]);

    return {
        create,
        isCreating,
    };
}
