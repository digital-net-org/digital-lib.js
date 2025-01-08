import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
import type { ClientConfig } from './ClientConfig';
import { type ClientContextState } from './ClientContextState';

export default class ClientStateBuilder {
    public static build(config: ClientConfig): ClientContextState {
        return {
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
                        staleTime: 60000,
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
