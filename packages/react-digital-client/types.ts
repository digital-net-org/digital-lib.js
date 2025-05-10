import type { AxiosRequestConfig } from 'axios';
import type { Result } from '@digital-lib/dto';

export type RequestConfig = Omit<AxiosRequestConfig, 'url' | 'baseURL'>;

export type Method = 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'GET';

export interface RequestCallbacks<T> {
    onError?: (error: Result & { status: number }) => Promise<void> | void;
    onSuccess?: (data: T) => Promise<void> | void;
}

export interface QueryConfig<T> extends RequestConfig, RequestCallbacks<T> {
    autoRefetch?: boolean;
    skipRefresh?: boolean;
}

export interface MutationConfig<T> extends RequestConfig, RequestCallbacks<T> {
    method?: Method;
    retry?: number;
    skipRefresh?: boolean;
}

export interface MutationPayload<T = object> {
    params?: T;
    body?: any;
    patch?: Array<PatchOperation>;
}

export interface PatchOperation {
    op: string;
    path: string;
    value: any;
}
