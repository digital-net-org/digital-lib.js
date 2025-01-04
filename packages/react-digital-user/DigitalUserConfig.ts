interface Api {
    endpoint: string;
    method?: string;
}

export interface DigitalUserConfig {
    refreshTokenApi: Api;
    logoutApi: Api;
    loginApi: Api;
    authStorageKey?: string;
    logoutRedirect?: string;
}
