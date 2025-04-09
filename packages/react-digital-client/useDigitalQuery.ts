import React from 'react';
import { type AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ObjectMatcher } from '../core';
import { type QueryConfig } from './types';
import { skipRefreshHeader } from './config';
import useDigitalClient from './useDigitalClient';

export default function useDigitalQuery<T, E = unknown>(
    key: string | undefined,
    { onError, onSuccess, skipRefresh, ...options }: QueryConfig<T, E> = {
        autoRefetch: true,
    }
) {
    const { axiosInstance } = useDigitalClient();
    const { data: queryResult, ...response } = useQuery<T, AxiosError<E>>({
        queryKey: key ? [key] : [],
        queryFn: async () => {
            if (!key) {
                return {} as T;
            }
            const { data, status } = await axiosInstance.get<T>(key, {
                ...options,
                headers: {
                    ...options.headers,
                    [skipRefreshHeader]: skipRefresh ? 'true' : 'false',
                },
            });
            if (status >= 400) {
                await onError?.(data);
            } else {
                await onSuccess?.(data);
            }
            return data;
        },
        ...options,
    });

    const data = React.useMemo(
        () => (ObjectMatcher.deepEquality(queryResult, {} as typeof queryResult) ? undefined : queryResult),
        [queryResult]
    );

    return { data, ...response };
}
