export const config = {
    authStorageKey: 'data-user',
    userApi: {
        login: '/authentication/user/login',
        logout: '/authentication/user/logout',
        logoutAll: '/authentication/user/logout-all',
        refreshToken: '/authentication/user/refresh',
    },
    router: {
        login: '/login',
        home: '/home',
    },
};
