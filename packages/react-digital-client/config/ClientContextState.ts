import type { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance } from 'axios';
import type { ClientConfig } from './ClientConfig';

export interface ClientContextState {
    queryClient: QueryClient;
    axiosInstance: AxiosInstance;
    authConfig: ClientConfig['authConfig'];
}

export const defaultClientContextState: ClientContextState = {
    queryClient: {} as QueryClient,
    axiosInstance: {} as AxiosInstance,
    authConfig: {
        refreshTokenApi: {
            endpoint: '/authentication/refresh',
            method: 'POST',
        },
        logoutApi: {
            endpoint: '/authentication/logout',
            method: 'POST',
        },
        loginApi: {
            endpoint: '/authentication/login',
            method: 'POST',
        },
        authStorageKey: 'DIGITAL_TOKEN',
        logoutRedirect: '/',
    },
};
