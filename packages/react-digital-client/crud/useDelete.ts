import React from 'react';
import type { Result } from '../../dto';
import type { MutationConfig } from '../types';
import useDigitalMutation from '../useDigitalMutation';

type Callback = MutationConfig<Result, null>;

export default function useDelete(
    endpoint: string,
    options?: {
        onSuccess?: Callback['onSuccess'];
        onError?: Callback['onError'];
    }
) {
    const { mutate, isPending: isDeleting } = useDigitalMutation<Result, { id: string }>(
        ({ id }) => `${endpoint}/${id}`,
        {
            method: 'DELETE',
            onSuccess: async e => {
                await options?.onSuccess?.(e);
            },
            onError: async e => {
                await options?.onError?.(e);
            },
        }
    );

    const _delete = React.useCallback((id: string | number) => mutate({ params: { id: String(id) } }), [mutate]);

    return {
        delete: _delete,
        isDeleting,
    };
}
