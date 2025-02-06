import React from 'react';
import { type Entity, EntityHelper, type Result } from '../../dto';
import { type MutationConfig } from '../types';
import useDigitalMutation from '../useDigitalMutation';

type Callback<T> = MutationConfig<Result<T>, null>;

/**
 * Hook to create entities.
 * @param endpoint The API endpoint.
 * @param options The options of the hook.
 *  - `onSuccess` The callback to be called on create success.
 *  - `onError` The callback to be called on create error.
 */
export default function usePatch<T extends Entity>(
    endpoint: string,
    options?: {
        onSuccess?: Callback<T>['onSuccess'];
        onError?: Callback<T>['onError'];
    }
) {
    const { mutate, isPending: isPatching } = useDigitalMutation<Result<T>, { id: string }>(
        ({ id }) => `${endpoint}/${id}`,
        {
            method: 'PATCH',
            onSuccess: async e => {
                await options?.onSuccess?.(e);
            },
            onError: async e => {
                await options?.onError?.(e);
            },
        }
    );

    const patch = React.useCallback(
        (id: string | number, patch: Partial<T>) =>
            mutate({
                params: { id: String(id) },
                patch: EntityHelper.buildPatch<T>(patch),
            }),
        [mutate]
    );

    return {
        patch,
        isPatching,
    };
}
