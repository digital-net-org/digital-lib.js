import type { AxiosRequestConfig } from 'axios';

export type RequestConfig = Omit<AxiosRequestConfig, 'url' | 'baseURL'>;

export interface QueryConfig<T, E> extends RequestConfig {
    onSuccess?: SuccessCallback<T>;
    onError?: ErrorCallback<E>;
    autoRefetch?: boolean;
}

export interface MutationConfig<T, E> extends RequestConfig {
    onSuccess?: SuccessCallback<T>;
    onError?: ErrorCallback<E>;
    method?: Method;
    retry?: number;
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

export type Method = 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'GET';
export type ErrorCallback<E> = (error: E | any) => Promise<void> | void;
export type SuccessCallback<T> = (data: T) => Promise<void> | void;
