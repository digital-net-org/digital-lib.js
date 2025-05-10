import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ObjectMatcher } from '../core';
import { type QueryConfig } from './types';
import { skipRefreshHeader } from './config';
import { ResponseHandler } from './ResponseHandler';
import DigitalClient from './DigitalClient';

export default function useDigitalQuery<T>(
    key: string | undefined,
    { onError, onSuccess, skipRefresh, ...options }: QueryConfig<T> = {
        autoRefetch: true,
    }
) {
    const { data: queryResult, ...response } = useQuery<T>({
        queryKey: key ? [key] : [],
        queryFn: async () => {
            if (!key) {
                return {} as T;
            }
            return ResponseHandler.handle(
                await DigitalClient.get<T>(key, {
                    ...options,
                    headers: {
                        ...options.headers,
                        [skipRefreshHeader]: skipRefresh ? 'true' : 'false',
                    },
                }),
                { onError, onSuccess }
            );
        },
        ...options,
    });

    const data = React.useMemo(
        () => (ObjectMatcher.deepEquality(queryResult, {} as typeof queryResult) ? undefined : queryResult),
        [queryResult]
    );

    return { data, ...response };
}
