import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
import type { ClientConfig } from './ClientConfig';
import { defaultClientContextState, type ClientContextState } from './ClientContextState';

export default class ConfigBuilder {
    public static build(config: ClientConfig): ClientContextState {
        return {
            authConfig: {
                ...defaultClientContextState.authConfig,
                ...config.authConfig ?? {},
                refreshTokenApi: {
                    ...defaultClientContextState.authConfig.refreshTokenApi,
                    ...config.authConfig?.refreshTokenApi ?? {},
                },
            },
            axiosInstance: axios.create({
                baseURL: 'http://localhost',
                withCredentials: true,
                ...config.axiosConfig ?? {},
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...config.axiosConfig?.headers ?? {},
                },
            }),
            queryClient: new QueryClient({
                defaultOptions: {
                    ...config.tanstackConfig ?? {},
                    queries: {
                        refetchOnWindowFocus: false,
                        refetchOnMount: false,
                        refetchOnReconnect: false,
                        retry: 0,
                        staleTime: 5000,
                        ...config.tanstackConfig?.queries ?? {},
                    },
                    mutations: {
                        retry: 0,
                        ...config.tanstackConfig?.mutations ?? {
                        },
                    },
                },
            }),
        };
    }
}
