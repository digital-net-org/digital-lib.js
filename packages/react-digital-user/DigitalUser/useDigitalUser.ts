import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDigitalRouter } from '../../react-digital';
import { useDigitalMutation } from '../../react-digital-client';
import type { Result } from '../../core';
import type { DigitalUser } from './DigitalUser';
import { Jwt } from '../Jwt';
import useStoredDigitalUser from './useStoredDigitalUser';
import { config } from '../config';

export default function useDigitalUser(): DigitalUser {
    const { current } = useDigitalRouter();
    const navigate = useNavigate();
    const { storedUser, deleteStoredUser, updateStoredUser } = useStoredDigitalUser(config.authStorageKey);

    const { mutate: login, isPending: loginLoading } = useDigitalMutation(config.userApi.login, {
        onSuccess: ({ value }: Result<string>) => {
            const decoded = Jwt.decode(value);
            if (!decoded) return;
            updateStoredUser({ ...decoded.content, token: decoded.token });
            navigate(config.router.home);
        },
        withCredentials: true,
    });
    const { mutate: logout, isPending: logoutLoading } = useDigitalMutation(config.userApi.logout, {
        onSuccess: () => {
            deleteStoredUser();
            navigate(config.router.login);
        },
        withCredentials: true,
    });

    const isLogged = React.useMemo(
        () =>
            storedUser?.token !== undefined &&
            storedUser?.token !== null &&
            storedUser?.id !== undefined &&
            storedUser?.id !== null,
        [storedUser]
    );

    const isUnauthorized = React.useMemo(() => !isLogged && !current?.isPublic, [current, isLogged]);

    const isLoading = React.useMemo(() => logoutLoading || loginLoading, [loginLoading, logoutLoading]);

    return {
        ...storedUser,
        login,
        logout,
        isLoading,
        isLogged,
        isUnauthorized,
        deleteStoredUser,
        updateStoredUser,
    };
}
