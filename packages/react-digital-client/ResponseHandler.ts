import type { AxiosResponse } from 'axios';
import { ResultBuilder } from '@digital-lib/dto';
import type { RequestCallbacks } from './types';

export class ResponseHandler {
    public static async handle<T = any>(
        { data, status }: AxiosResponse<T>,
        { onError, onSuccess }: RequestCallbacks<T> = {}
    ) {
        if (status >= 400) {
            await onError?.({ ...ResultBuilder.buildError(data), status });
        } else {
            await onSuccess?.(data);
        }
        return data;
    }
}
