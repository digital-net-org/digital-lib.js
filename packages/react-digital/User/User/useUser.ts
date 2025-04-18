import React from 'react';
import type { Result } from '@digital-lib/dto';
import { useDigitalMutation } from '@digital-lib/react-digital-client';
import { useToaster } from '../../Toaster';
import { UserContext } from './UserProvider';
import type { User } from './User';
import useJwt from './useJwt';

const authApiUrl = `${CORE_API_URL}/authentication/user`;

export default function useUser(): User {
    const { toast } = useToaster();
    const [token, setToken] = useJwt();
    const { isLoading: isQuerying, refresh, ...user } = React.useContext(UserContext);

    const { mutate: login, isPending: loginLoading } = useDigitalMutation(`${authApiUrl}/login`, {
        onSuccess: async ({ value }: Result<string>) => {
            setToken(value);
            toast('user:auth.success');
        },
        onError: () => toast('user:auth.error', 'error'),
        withCredentials: true,
    });

    const { mutate: logout, isPending: logoutLoading } = useDigitalMutation(`${authApiUrl}/logout`, {
        onSuccess: () => {
            setToken(undefined);
            toast('user:auth.revoked');
        },
        onError: () => {
            setToken(undefined);
            toast('user:auth.revoked');
        },
        withCredentials: true,
        skipRefresh: true,
    });

    const isLoading = React.useMemo(
        () => logoutLoading || loginLoading || isQuerying,
        [isQuerying, loginLoading, logoutLoading]
    );

    const isLogged = React.useMemo(() => token !== undefined && token !== null, [token]);

    return {
        ...user,
        isLoading,
        isLogged,
        refresh,
        logout,
        login,
    };
}
