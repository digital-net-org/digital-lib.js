import React, { type PropsWithChildren } from 'react';
import { type AppUserContextState, defaultAppUserContextState } from './AppUserContextState';
import { type StoredAppUser } from './StoredAppUser';
import useDigitalClient from '../useDigitalClient';
import { useLocalStorage } from '../../react-storage';
import { Jwt } from '../utils';

export const AppUserContext = React.createContext<AppUserContextState>(defaultAppUserContextState);

export default function AppUserProvider(props: PropsWithChildren) {
    const client = useDigitalClient();
    const [storedUser, setStoredUser] = useLocalStorage<StoredAppUser>(client.authConfig.authStorageKey, {});

    const isLogged = () =>
        storedUser?.token !== undefined
        && storedUser?.token !== null
        && storedUser?.id !== undefined
        && storedUser?.id !== null;

    const isExpired = React.useCallback(() => Jwt.isExpired(storedUser?.token ?? ''), [storedUser]);
    const update = React.useCallback((user: StoredAppUser) => setStoredUser(user), [setStoredUser]);
    const remove = React.useCallback(() => setStoredUser({}), [setStoredUser]);

    return (
        <AppUserContext.Provider
            {...props}
            value={{
                ...storedUser,
                update,
                remove,
                isLogged,
                isExpired,
            }}
        />
    );
}
