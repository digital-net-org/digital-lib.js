import { useQuery } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { type QueryConfig } from './types';
import useDigitalClient from './useDigitalClient';

export default function useDigitalQuery<T, E = unknown>(
    key: string,
    { method, onError, onSuccess, ...options }: QueryConfig<T, E> = {
        autoRefetch: true,
    },
) {
    const { axiosInstance, queryClient } = useDigitalClient();
    const response = useQuery<T, AxiosError<E>>({
        queryKey: [key],
        queryFn: async () => {
            const { data, status } = await axiosInstance.get<T>(key, options);
            if (status >= 400) {
                await onError?.(data);
            } else {
                await onSuccess?.(data);
            }
            return data;
        },
        ...options,
    });

    const refetch = async () => {
        await queryClient.invalidateQueries({ queryKey: [key] });
        await response.refetch();
    };

    return { ...response, refetch };
}
