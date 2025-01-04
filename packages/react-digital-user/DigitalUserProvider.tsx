import React, { type PropsWithChildren } from 'react';
import { useLocalStorage } from '../react-digital';
import { Jwt } from './Jwt';
import type { StoredDigitalUser } from './StoredDigitalUser';
import type { DigitalUserConfig } from './DigitalUserConfig';
import AuthInterceptor from './AuthInterceptor';

export interface DigitalUserContextState extends
    StoredDigitalUser,
    Omit<DigitalUserConfig, 'logoutRedirect' | 'authStorageKey'> {
    update: (user: StoredDigitalUser) => void;
    remove: () => void;
    isLogged: () => boolean;
    isExpired: () => boolean;
    logoutRedirect: string;
    authStorageKey: string;
}

export const defaultDigitalUserContextState = {
    update: () => void 0,
    remove: () => void 0,
    isLogged: () => false,
    isExpired: () => false,
    refreshTokenApi: { endpoint: '', method: 'POST' },
    logoutApi: { endpoint: '', method: 'POST' },
    loginApi: { endpoint: '', method: 'POST' },
    authStorageKey: '',
    logoutRedirect: '',
};

export const DigitalUserContext = React.createContext<DigitalUserContextState>(defaultDigitalUserContextState);

export default function DigitalUserProvider({ children, ...config }: PropsWithChildren<DigitalUserConfig>) {
    const resolvedConfig = React.useMemo(() => ({
        ...config,
        refreshTokenApi: { ...config.refreshTokenApi, method: config.refreshTokenApi.method ?? 'POST' },
        logoutApi: { ...config.logoutApi, method: config.logoutApi.method ?? 'POST' },
        loginApi: { ...config.loginApi, method: config.loginApi.method ?? 'POST' },
        authStorageKey: config.authStorageKey ?? 'DIGITAL_TOKEN',
        logoutRedirect: config.logoutRedirect ?? '/login',
    }), [config]);

    const [storedUser, setStoredUser] = useLocalStorage<StoredDigitalUser>(resolvedConfig.authStorageKey, {});

    const isLogged = () =>
        storedUser?.token !== undefined
        && storedUser?.token !== null
        && storedUser?.id !== undefined
        && storedUser?.id !== null;

    const isExpired = React.useCallback(() => Jwt.isExpired(storedUser?.token ?? ''), [storedUser]);
    const update = React.useCallback((user: StoredDigitalUser) => setStoredUser(user), [setStoredUser]);
    const remove = React.useCallback(() => setStoredUser({}), [setStoredUser]);

    return (
        <DigitalUserContext.Provider
            value={{
                ...storedUser,
                update,
                remove,
                isLogged,
                isExpired,
                ...resolvedConfig,
            }}
        >
            <AuthInterceptor />
            {children}
        </DigitalUserContext.Provider>
    );
}
