import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Result } from '../core';
import { useDigitalMutation } from '../react-digital-client';
import { Jwt } from './Jwt';
import { type DigitalUser } from './DigitalUser';
import { DigitalUserContext } from './DigitalUserProvider';

export default function useDigitalUser(): DigitalUser {
    const navigate = useNavigate();
    const {
        update,
        remove,
        loginApi,
        logoutApi,
        logoutRedirect,
        refreshTokenApi: _,
        ...user
    } = React.useContext(DigitalUserContext);

    const { mutate: login, isPending: loginLoading } = useDigitalMutation(loginApi.endpoint, {
        method: loginApi.method as any,
        onSuccess: ({ value }: Result<string>) => {
            const decoded = Jwt.decode(value);
            if (!decoded) return;
            update({ ...decoded.content, token: decoded.token });
            navigate(logoutRedirect);
        },
        withCredentials: true,
    });
    const { mutate: logout, isPending: logoutLoading } = useDigitalMutation(logoutApi.endpoint, {
        method: logoutApi.method as any,
        onSuccess: () => {
            remove();
            navigate(logoutRedirect);
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
