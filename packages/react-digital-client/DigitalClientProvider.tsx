import React, { type PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { type ClientContextState, defaultClientContextState } from './config/ClientContextState';
import { type ClientConfig } from './config/ClientConfig';
import ConfigBuilder from './config/ConfigBuilder';
import AppUserProvider from './AppUser/AppUserProvider';
import AuthInterceptor from './AppUser/AuthInterceptor';

export const DigitalClientContext = React.createContext<ClientContextState>(defaultClientContextState);

export default function DigitalClientProvider({ children, ...config }: PropsWithChildren<ClientConfig>) {
    const resolvedConfig = React.useMemo(() => ConfigBuilder.build(config), [config]);

    return (
        <DigitalClientContext.Provider value={resolvedConfig}>
            <AppUserProvider>
                <QueryClientProvider client={resolvedConfig.queryClient}>
                    <AuthInterceptor />
                    {children}
                </QueryClientProvider>
            </AppUserProvider>
        </DigitalClientContext.Provider>
    );
}
