import React from 'react';
import type { Result, Entity } from '../../core';
import type { MutationConfig } from '../types';
import useDigitalMutation from '../useDigitalMutation';

export default function usePatch<T extends Entity>(
    endpoint: string,
    options?: {
        onSuccess?: MutationConfig<Result<T>, null>['onSuccess'];
        onError?: MutationConfig<Result<T>, null>['onError'];
    },
) {
    const { mutate, isPending: isPatching } = useDigitalMutation<Result<T>, { id: string }>(
        ({ id }) => `${endpoint}/${id}`,
        {
            method: 'PATCH',
            onSuccess: async (e) => {
                await options?.onSuccess?.(e);
            },
            onError: async (e) => {
                await options?.onError?.(e);
            },
        },
    );

    const patch = React.useCallback(
        (id: string | number, patch: Partial<T>) => {
            delete patch.id;
            delete patch.createdAt;
            delete patch.updatedAt;

            mutate({
                params: { id: String(id) },
                patch: Object.keys(patch).map(key => ({
                    op: 'replace',
                    path: `/${key}`,
                    value: patch[(key as unknown) as keyof T],
                })),
            });
        },
        [mutate],
    );

    return {
        patch,
        isPatching,
    };
}
