import React from 'react';
import type { DigitalUserConfig } from './DigitalUserConfig';

const defaultConfig: DigitalUserConfig = {
    routerOptions: { loginRedirect: '', logoutRedirect: '', publicRoutes: [] },
    userApi: { login: '', logout: '', refreshToken: '' },
    authStorageKey: '',
};

export const DigitalUserConfigContext = React.createContext<DigitalUserConfig>(defaultConfig);

export default function DigitalUserConfigProvider({ children, ...config }: React.PropsWithChildren<DigitalUserConfig>) {
    return (
        <DigitalUserConfigContext.Provider value={config}>
            {children}
        </DigitalUserConfigContext.Provider>
    );
}
