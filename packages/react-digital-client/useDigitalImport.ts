import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ObjectMatcher } from '@digital-lib/core';
import { ResultBuilder } from '@digital-lib/dto';
import { DigitalClient } from './DigitalClient';
import { type QueryOptions, type RequestCallbacks } from './types';

export function useDigitalImport<T>(key: string, { trigger, onError, onSuccess }: RequestCallbacks<T> & QueryOptions) {
    const { data: content, ...response } = useQuery<T>({
        queryKey: trigger !== false ? [key] : [],
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

    const data = React.useMemo(() => (ObjectMatcher.isEmptyObject(content) ? undefined : content), [content]);

    return { data, ...response };
}
