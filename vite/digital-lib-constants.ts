import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), '');

export const digitalLibConstants = {
    APP_VERSION: env.APP_VERSION ?? '0.0.0',
    CORE_API_URL: env.CORE_API_URL,
    PAGES_API_URL: env.PAGES_API_URL,
    STORAGE_KEY_AUTH: 'data-user',
    ROUTER_LOGIN: '/login',
    ROUTER_HOME: '/',
};
