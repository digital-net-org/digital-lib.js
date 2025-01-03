import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Jwt } from '../utils';
import { type Result } from '../../core';
import { type AppUser } from './AppUser';
import { AppUserContext } from './AppUserProvider';
import useDigitalClient from '../useDigitalClient';
import useDigitalMutation from '../useDigitalMutation';

export default function useApiUser(): AppUser {
    const navigate = useNavigate();
    const client = useDigitalClient();

    const { update, remove, ...user } = React.useContext(AppUserContext);

    const { mutate: login, isPending: loginLoading } = useDigitalMutation(client.authConfig.loginApi.endpoint, {
        method: client.authConfig.loginApi.method as any,
        onSuccess: ({ value }: Result<string>) => {
            const decoded = Jwt.decode(value);
            if (!decoded) return;
            update({ ...decoded.content, token: decoded.token });
            navigate(client.authConfig.logoutRedirect);
        },
        withCredentials: true,
    });
    const { mutate: logout, isPending: logoutLoading } = useDigitalMutation(client.authConfig.logoutApi.endpoint, {
        method: client.authConfig.logoutApi.method as any,
        onSuccess: () => {
            remove();
            navigate(client.authConfig.logoutRedirect);
        },
        withCredentials: true,
    });

    const loading = React.useMemo(() => logoutLoading || loginLoading, [loginLoading, logoutLoading]);

    return {
        ...user,
        login,
        logout: () => logout({}),
        loading,
    };
}
