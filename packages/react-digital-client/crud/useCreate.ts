import React from 'react';
import type { Entity, Result } from '../../core';
import useDigitalMutation from '../useDigitalMutation';

export default function useCreate<T extends Entity>(endpoint: string, invalidateQuery?: () => Promise<void>) {
    const { mutate, isPending: isCreating } = useDigitalMutation<Result<T>>(endpoint, {
        onSuccess: async () => {
            await invalidateQuery?.();
        },
    });

    const create = React.useCallback((body: Partial<T>) => mutate({ body }), [mutate]);

    return {
        create,
        isCreating,
    };
}
