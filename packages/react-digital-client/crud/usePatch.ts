import React from 'react';
import type { Result, Entity } from '../../core';
import useDigitalMutation from '../useDigitalMutation';

export default function usePatch<T extends Entity>(endpoint: string, invalidateQuery?: () => Promise<void>) {
    const { mutate, isPending: isPatching } = useDigitalMutation<Result<T>, { id: string }>(
        ({ id }) => `${endpoint}/${id}`,
        {
            method: 'PATCH',
            onSuccess: async () => {
                await invalidateQuery?.();
            },
        },
    );

    const patch = React.useCallback(
        (id: string | number, patch: Partial<T>) =>
            mutate({
                params: { id: String(id) },
                patch: Object.keys(patch).map(key => ({
                    op: 'replace',
                    path: `/${key}`,
                    value: patch[(key as unknown) as keyof T],
                })),
            }),
        [mutate],
    );

    return {
        patch,
        isPatching,
    };
}
