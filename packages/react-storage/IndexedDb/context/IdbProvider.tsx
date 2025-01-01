import React, { type PropsWithChildren } from 'react';
import type { IDbConfig } from '../types/IDbConfig';
import { IdbContext } from './IdbContext';
import IDbAccessor from '../IDbAccessor';

/**
 * Indexed database provider
 * @param children - child components
 * @param idbConfig - database configuration object
 */
export default function IdbProvider({ children, ...idbConfig }: PropsWithChildren<IDbConfig>) {
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
        <IdbContext.Provider value={{ isLoading, setIsLoading, ...idbConfig }}>
            {children}
        </IdbContext.Provider>
    );
}
