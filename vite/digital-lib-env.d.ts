/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare const APP_VERSION: string;
declare const APP_ROOT: string;
declare const DIGITAL_API_URL: string;
declare const STORAGE_KEY_AUTH: string;
declare const STORAGE_KEY_THEME: string;
declare const ROUTER_LOGIN: string;
declare const ROUTER_HOME: string;
