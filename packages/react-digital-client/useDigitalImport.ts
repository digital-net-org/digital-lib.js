import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ObjectMatcher } from '@digital-lib/core';
import { ResultBuilder } from '@digital-lib/dto';
import { DigitalClient } from './DigitalClient';
import { type QueryConfig } from './types';

export function useDigitalImport<T>(
    key: string,
    {
        trigger,
        onError,
        onSuccess,
    }: {
        trigger?: QueryConfig<T>['trigger'];
        onError?: QueryConfig<T>['onError'];
        onSuccess?: QueryConfig<T>['onSuccess'];
    }
) {
    const { data: content, ...response } = useQuery<T>({
        queryKey: [key],
        queryFn: async () => {
            let result = {} as T;
            if (trigger === false) {
                return result;
            }
            const { data, status } = await DigitalClient.get<string>(key, {
                headers: {
                    'Content-Type': 'application/javascript',
                },
            });

            if (status >= 400 || !data || typeof data !== 'string') {
                await onError?.({ ...ResultBuilder.buildError(data), status });
            } else {
                const module = {} as { default: T; exports?: T };
                new Function('module', data)(module);
                result = module.exports || module.default;
                await onSuccess?.(result);
            }
            return result;
        },
    });

    const data = React.useMemo(
        () => (ObjectMatcher.deepEquality(content, {} as typeof content) ? undefined : content),
        [content]
    );

    return { data, ...response };
}
