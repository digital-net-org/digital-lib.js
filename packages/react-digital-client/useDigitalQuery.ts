import { useQuery } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { type QueryConfig } from './types';
import useDigitalClient from './useDigitalClient';
import React from 'react';
import { ObjectMatcher } from '../core';

export default function useDigitalQuery<T, E = unknown>(
    key: string | undefined,
    { method, onError, onSuccess, ...options }: QueryConfig<T, E> = {
        autoRefetch: true,
    },
) {
    const { axiosInstance, queryClient } = useDigitalClient();
    const { data: queryResult, ...response } = useQuery<T, AxiosError<E>>({
        queryKey: [key],
        queryFn: async () => {
            if (!key) {
                return {} as T;
            }
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

    const data = React.useMemo(
        () => ObjectMatcher.deepEquality(queryResult, {} as typeof queryResult) ? undefined : queryResult,
        [queryResult],
    );

    return { data, ...response, refetch };
}
