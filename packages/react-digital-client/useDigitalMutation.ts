import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { type MutationConfig, type MutationPayload } from './types';
import useDigitalClient from './useDigitalClient';

export default function useDigitalMutation<T, P = object, E = unknown>(
    key: ((payload: P) => string) | string,
    { method, retry, onError, onSuccess, ...options }: MutationConfig<T, E>
) {
    const { axiosInstance } = useDigitalClient();
    const mutation = useMutation<T, AxiosError<E, any>, MutationPayload<P>>({
        mutationFn: async payload => {
            const url = key instanceof Function && payload.params ? key(payload.params) : (key as string);
            const { data, status } = await axiosInstance.request<T>({
                method: method ?? 'POST',
                url,
                data: payload.patch ?? payload.body ?? {},
                ...options,
            });
            if (status >= 400) {
                await onError?.(data);
            } else {
                await onSuccess?.(data);
            }
            return data;
        },
        retry: retry ?? 0,
    });

    return {
        ...mutation,
        mutate: (payload?: MutationPayload<P>) => mutation.mutate(payload ?? {}) as T,
        mutateAsync: async (payload?: MutationPayload<P>) => await mutation.mutateAsync(payload ?? {}),
    };
}
