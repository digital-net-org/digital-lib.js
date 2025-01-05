import type { DigitalUserConfig } from './DigitalUserConfig';

export default class ConfigBuilder {
    public static build(config: Partial<DigitalUserConfig>) {
        return {
            authStorageKey: config.authStorageKey ?? 'data-user',
            userApi: {
                login: config?.userApi?.login ?? '/login',
                logout: config?.userApi?.logout ?? '/logout',
                refreshToken: config?.userApi?.refreshToken ?? '/refresh',
            },
            routerOptions: {
                logoutRedirect: config?.routerOptions?.logoutRedirect ?? '/login',
                loginRedirect: config?.routerOptions?.loginRedirect ?? '/',
                publicRoutes: [...(config?.routerOptions?.publicRoutes ?? []), '*'],
            },
        };
    };
}
