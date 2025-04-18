import React from 'react';
import { type EntityRaw, type Result, type UserModel, EntityHelper } from '@digital-lib/dto';
import { DigitalClient, useDigitalQuery } from '@digital-lib/react-digital-client';
import { useToaster } from '../../Toaster';
import useJwt from './useJwt';

interface UserContextState extends Partial<UserModel> {
    isLoading: boolean;
    refresh: () => void;
}

export const UserContext = React.createContext<UserContextState>({
    isLoading: false,
    refresh: () => void 0,
});

const getSelfUrl = `${CORE_API_URL}/user/self`;

export default function UserProvider({ children }: React.PropsWithChildren) {
    const { toast } = useToaster();
    const [token, _] = useJwt();
    const {
        data: userData,
        isLoading,
        refetch: refresh,
    } = useDigitalQuery<Result<EntityRaw>>(!token ? undefined : getSelfUrl, {
        onError: () => toast('global:errors.unhandled', 'error'),
    });

    const user = React.useMemo(
        () => (userData?.value ? EntityHelper.build<UserModel>(userData.value) : undefined),
        [userData]
    );

    React.useEffect(() => (token !== undefined ? DigitalClient.invalidate(getSelfUrl) : void 0), [token]);

    return <UserContext.Provider value={{ isLoading, refresh, ...user }}>{children}</UserContext.Provider>;
}
