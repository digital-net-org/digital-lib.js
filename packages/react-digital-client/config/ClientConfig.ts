import type { CreateAxiosDefaults } from 'axios';
import type { DefaultOptions } from '@tanstack/react-query';

export interface ClientConfig {
    authConfig: {
        refreshTokenApi: {
            endpoint: string;
            method: string;
        };
        logoutApi: {
            endpoint: string;
            method: string;
        };
        loginApi: {
            endpoint: string;
            method: string;
        };
        authStorageKey: string;
        logoutRedirect: string;
    };
    axiosConfig: CreateAxiosDefaults;
    tanstackConfig: DefaultOptions;
}
