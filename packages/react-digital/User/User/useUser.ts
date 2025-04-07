import React from 'react';
import type { Result } from '../../../dto';
import { useDigitalClient, useDigitalMutation } from '../../../react-digital-client';
import { useJwt } from '../Jwt';
import { getSelfUrl, UserContext } from './UserProvider';
import type { User } from './User';

const authApiUrl = `${CORE_API_URL}/authentication/user`;

export default function useUser(): User {
    const [token, setToken] = useJwt();
    const { queryClient } = useDigitalClient();
    const { isLoading: isQuerying, refresh, ...user } = React.useContext(UserContext);

    const { mutate: login, isPending: loginLoading } = useDigitalMutation(`${authApiUrl}/login`, {
        onSuccess: async ({ value }: Result<string>) => {
            setToken(value);
            await queryClient.invalidateQueries({ queryKey: [getSelfUrl], refetchType: 'all' });
        },
        withCredentials: true,
    });

    const { mutate: logout, isPending: logoutLoading } = useDigitalMutation(`${authApiUrl}/logout`, {
        onSuccess: () => setToken(undefined),
        withCredentials: true,
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
