import React, { type PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, { AxiosInstance } from 'axios';

export interface ClientContextState {
    queryClient: QueryClient;
    axiosInstance: AxiosInstance;
}

export const defaultClientContextState: ClientContextState = {
    queryClient: {} as QueryClient,
    axiosInstance: {} as AxiosInstance,
};

export const DigitalClientContext = React.createContext<ClientContextState>(defaultClientContextState);

export default function DigitalClientProvider({ children }: PropsWithChildren) {
    const axiosInstance = React.useMemo(
        () =>
            axios.create({
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }),
        []
    );

    const queryClient = React.useMemo(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        refetchOnMount: false,
                        refetchOnReconnect: false,
                        retry: 0,
                        staleTime: 60000,
                    },
                    mutations: {
                        retry: 0,
                    },
                },
            }),
        []
    );

    return (
        <DigitalClientContext.Provider value={{ axiosInstance, queryClient }}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </DigitalClientContext.Provider>
    );
}
