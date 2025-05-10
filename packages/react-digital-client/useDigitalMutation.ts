import { useMutation } from '@tanstack/react-query';
import { type MutationConfig, type MutationPayload } from './types';
import { skipRefreshHeader } from './config';
import { ResponseHandler } from './ResponseHandler';
import { DigitalClient } from './DigitalClient';

export function useDigitalMutation<T, P = object>(
    key: ((payload: P) => string) | string,
    { method, retry, onError, onSuccess, skipRefresh, ...options }: MutationConfig<T>
) {
    const mutation = useMutation<T, any, MutationPayload<P>>({
        mutationFn: async payload => {
            const url = key instanceof Function && payload.params ? key(payload.params) : (key as string);
            return ResponseHandler.handle(
                await DigitalClient.request<T>({
                    method: method ?? 'POST',
                    url,
                    data: payload.patch ?? payload.body ?? {},
                    headers: {
                        ...options.headers,
                        [skipRefreshHeader]: skipRefresh ? 'true' : 'false',
                    },
                    ...options,
                }),
                { onError, onSuccess }
            );
        },
        retry: retry ?? 0,
    });

    return {
        ...mutation,
        mutate: (payload?: MutationPayload<P>) => mutation.mutate(payload ?? {}) as T,
        mutateAsync: async (payload?: MutationPayload<P>) => await mutation.mutateAsync(payload ?? {}),
    };
}
