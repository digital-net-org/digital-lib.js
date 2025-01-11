export interface PartialDigitalUserConfig extends Omit<DigitalUserConfig, 'authStorageKey'> {
    authStorageKey?: string;
}

export interface DigitalUserConfig {
    authStorageKey: string;
    userApi: {
        refreshToken: string;
        logout: string;
        login: string;
    };
    routerOptions: {
        publicRoutes: Array<string>;
        logoutRedirect: string;
        loginRedirect: string;
    };
}
