import React, { type PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { type ClientContextState, defaultClientContextState } from './config/ClientContextState';
import { type ClientConfig } from './config/ClientConfig';
import ConfigBuilder from './config/ConfigBuilder';

export const DigitalClientContext = React.createContext<ClientContextState>(defaultClientContextState);

export default function DigitalClientProvider({ children, ...config }: PropsWithChildren<ClientConfig>) {
    const resolvedConfig = React.useMemo(() => ConfigBuilder.build(config), [config]);
    return (
        <DigitalClientContext.Provider value={resolvedConfig}>
            <QueryClientProvider client={resolvedConfig.queryClient}>
                {children}
            </QueryClientProvider>
        </DigitalClientContext.Provider>
    );
}
