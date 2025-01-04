import * as React from 'react';
import { createBrowserRouter, RouterProvider as Router } from 'react-router-dom';
import RouteRender, { type RouteRenderState } from './RouteRender';
import RouterBuilder from './utils/RouterBuilder';

export interface RouteObject {
    path: string;
    element: React.ReactNode;
}

export interface RouterConfig {
    appUrls: {
        public: Array<string>;
        login: string;
        home?: string;
    };
    documentName: string;
    router?: Array<RouteObject>;
    renderLayout?: (state: RouteRenderState) => React.ReactNode;
}

export interface RouterState {
    router: Array<RouteObject>;
}

const defaultRouterConfig: RouterConfig = {
    appUrls: {
        public: [],
        login: '',
    },
    documentName: '',
    router: [],
    renderLayout: () => null,
};

export const RouterContext = React.createContext<RouterConfig>(defaultRouterConfig);

export default function DigitalRouterProvider(config: RouterConfig) {
    const router = React.useMemo(() => [...(config.router ?? []), ...RouterBuilder.build()], [config]);
    return (
        <RouterContext.Provider value={{ ...config, router }}>
            <Router
                router={createBrowserRouter(
                    router.map(({ element, path }) => ({
                        path,
                        element: (
                            <RouteRender
                                isPublic={(config.appUrls.public ?? []).includes(path)}
                                appUrls={config.appUrls}
                                documentName={config.documentName}
                                renderLayout={config.renderLayout}
                            >
                                {element}
                            </RouteRender>
                        ),
                    })),
                )}
            />
        </RouterContext.Provider>
    );
}
