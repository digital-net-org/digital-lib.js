import type * as React from 'react';
import type { RouteObject } from './RouteObject';

export interface RouterConfig {
    router: Array<RouteObject>;
    renderDocumentName?: (current: string) => string;
}
