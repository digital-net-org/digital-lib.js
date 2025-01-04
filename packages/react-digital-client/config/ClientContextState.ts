import type { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance } from 'axios';

export interface ClientContextState {
    queryClient: QueryClient;
    axiosInstance: AxiosInstance;
}

export const defaultClientContextState: ClientContextState = {
    queryClient: {} as QueryClient,
    axiosInstance: {} as AxiosInstance,
};
