import React, { type PropsWithChildren } from 'react';
import type { IDbConfig } from './types/IDbConfig';
import { DigitalIdbContext } from './DigitalIdbContext';
import IDbAccessor from './IDbAccessor';

/**
 * Indexed database provider
 * @param children - child components
 * @param idbConfig - database configuration object
 */
export default function DigitalIdbProvider({ children, ...idbConfig }: PropsWithChildren<IDbConfig>) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isInitialized, setIsInitialized] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            if (isInitialized || isLoading) {
                return;
            }

            setIsLoading(true);
            await IDbAccessor.initDatabase({
                ...idbConfig,
                onSuccess: () => setIsInitialized(true),
                onError: e => console.error(e.message),
                onResolve: () => setIsLoading(false),
            });
        })();
    }, [idbConfig, isInitialized, isLoading]);

    return (
        <DigitalIdbContext.Provider value={{ isLoading, setIsLoading, ...idbConfig }}>
            {children}
        </DigitalIdbContext.Provider>
    );
}
