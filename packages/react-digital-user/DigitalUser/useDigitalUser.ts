import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type DigitalRoute, useLocalStorage, useDigitalRouter } from '../../react-digital';
import { useDigitalMutation } from '../../react-digital-client';
import type { Result } from '../../core';
import type { DigitalUser } from './DigitalUser';
import { Jwt } from '../Jwt';
import useStoredDigitalUser from './useStoredDigitalUser';
import { DigitalUserConfigContext } from '../config';

export default function useDigitalUser(): DigitalUser {
    const config = React.useContext(DigitalUserConfigContext);
    const { current } = useDigitalRouter();
    const navigate = useNavigate();
    const { storedUser, deleteStoredUser, updateStoredUser } = useStoredDigitalUser(config.authStorageKey);

    const isRoutePublic = React.useCallback(
        (route: DigitalRoute | undefined) => Boolean(
            route?.path && config.routerOptions.publicRoutes.includes(route.path),
        ),
        [config.routerOptions.publicRoutes],
    );

    const { mutate: login, isPending: loginLoading } = useDigitalMutation(config.userApi.login, {
        onSuccess: ({ value }: Result<string>) => {
            const decoded = Jwt.decode(value);
            if (!decoded) return;
            updateStoredUser({ ...decoded.content, token: decoded.token });
            navigate(config.routerOptions.loginRedirect);
        },
        withCredentials: true,
    });
    const { mutate: logout, isPending: logoutLoading } = useDigitalMutation(config.userApi.logout, {
        onSuccess: () => {
            deleteStoredUser();
            navigate(config.routerOptions.logoutRedirect);
        },
        withCredentials: true,
    });

    const isLogged = React.useMemo(
        () =>
            storedUser?.token !== undefined
            && storedUser?.token !== null
            && storedUser?.id !== undefined
            && storedUser?.id !== null,
        [storedUser],
    );

    const isUnauthorized = React.useMemo(
        () => !isLogged && !isRoutePublic(current),
        [current, isLogged, isRoutePublic],
    );

    const isLoading = React.useMemo(
        () => logoutLoading || loginLoading,
        [loginLoading, logoutLoading],
    );

    return {
        ...storedUser,
        login,
        logout,
        isLoading,
        isLogged,
        isUnauthorized,
        isRoutePublic,
        deleteStoredUser,
        updateStoredUser,
    };
}
