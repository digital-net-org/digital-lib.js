import React from 'react';
import { type EntityRaw, type Result, type UserModel, EntityHelper } from '../../../dto';
import { useLocalStorage } from '../../../core';
import { useDigitalQuery } from '../../../react-digital-client';
import { Jwt } from '../Jwt';

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
    const [token] = useLocalStorage<string | undefined>(STORAGE_KEY_AUTH);

    const {
        data: userData,
        isLoading,
        refetch: refresh,
    } = useDigitalQuery<Result<EntityRaw>>(!token ? undefined : getSelfUrl, {
        onError: error => (error.status === 401 ? Jwt.set() : void 0),
    });

    const user = React.useMemo(
        () => (userData?.value ? EntityHelper.build<UserModel>(userData.value) : undefined),
        [userData]
    );

    return <UserContext.Provider value={{ isLoading, refresh, ...user }}>{children}</UserContext.Provider>;
}
