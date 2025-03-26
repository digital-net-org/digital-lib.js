import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDigitalRouter } from '../../react-digital';
import { useDigitalMutation } from '../../react-digital-client';
import type { Result } from '../../dto';
import type { DigitalUser } from './DigitalUser';
import { Jwt } from '../Jwt';
import useStoredDigitalUser from './useStoredDigitalUser';

const authApiUrl = `${CORE_API_URL}/authentication/user`;

export default function useDigitalUser(): DigitalUser {
    const { current } = useDigitalRouter();
    const navigate = useNavigate();
    const { storedUser, deleteStoredUser, updateStoredUser } = useStoredDigitalUser(STORAGE_KEY_AUTH);

    const { mutate: login, isPending: loginLoading } = useDigitalMutation(`${authApiUrl}/login`, {
        onSuccess: ({ value }: Result<string>) => {
            const decoded = Jwt.decode(value);
            if (!decoded) return;
            updateStoredUser({ ...decoded.content, token: decoded.token });
            navigate(ROUTER_HOME);
        },
        withCredentials: true,
    });
    const { mutate: logout, isPending: logoutLoading } = useDigitalMutation(`${authApiUrl}/logout`, {
        onSuccess: () => {
            deleteStoredUser();
            navigate(ROUTER_LOGIN);
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
