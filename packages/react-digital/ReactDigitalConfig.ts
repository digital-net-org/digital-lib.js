import type { RouterConfig } from './Router';

export interface ReactDigitalConfig extends RouterConfig {
    rootElement?: HTMLElement | null;
    strictMode?: boolean;
}
