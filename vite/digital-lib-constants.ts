import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), '');

export const digitalLibConstants = {
    DIGITAL_CORE_API_URL: env.DIGITAL_CORE_API_URL,
    DIGITAL_PAGES_API_URL: env.DIGITAL_PAGES_API_URL,
};
