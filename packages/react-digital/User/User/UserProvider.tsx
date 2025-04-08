import React from 'react';
import { type EntityRaw, type Result, type UserModel, EntityHelper } from '../../../dto';
import { useDigitalQuery } from '../../../react-digital-client';
import { useJwt } from '../Jwt';

interface UserContextState extends Partial<UserModel> {
    isLoading: boolean;
    refresh: () => void;
}

export const UserContext = React.createContext<UserContextState>({
    isLoading: false,
    refresh: () => void 0,
});

export const getSelfUrl = `${CORE_API_URL}/user/self`;

export default function UserProvider({ children }: React.PropsWithChildren) {
    const [token, setToken] = useJwt();
    const {
        data: userData,
        isLoading,
        refetch: refresh,
    } = useDigitalQuery<Result<EntityRaw>>(!token ? undefined : getSelfUrl);

    const user = React.useMemo(
        () => (userData?.value ? EntityHelper.build<UserModel>(userData.value) : undefined),
        [userData]
    );

    return <UserContext.Provider value={{ isLoading, refresh, ...user }}>{children}</UserContext.Provider>;
}
