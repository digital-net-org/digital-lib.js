import * as React from 'react';
import { createBrowserRouter, RouterProvider as ReactRouter } from 'react-router-dom';
import RouterBuilder from './builder/RouterBuilder';
import RouterDocument from './middlewares/RouterDocument';
import type { RouterConfig } from './config';

export interface RouterProps extends RouterConfig {
    middlewares?: React.ReactNode[];
    renderLayout: (children: React.ReactNode) => React.ReactNode;
}

export const RouterContext = React.createContext<RouterConfig>({
    router: [],
    renderDocumentName: current => current,
});

export default function Router({ middlewares, ...config }: RouterProps) {
    const router = React.useMemo(
        () => [...(config.router ?? []), ...RouterBuilder.build()], [config],
    );

    return (
        <RouterContext.Provider value={{ ...config, router }}>
            <ReactRouter
                router={createBrowserRouter(
                    router.map(({ element, path }) => ({
                        path,
                        element: (
                            <React.Fragment>
                                <RouterDocument />
                                {(middlewares ?? []).map(middleware => React.createElement(
                                    React.Fragment,
                                    {
                                        children: middleware,
                                        key: (middleware as { type: React.JSXElementConstructor<any> }).type.name,
                                    },
                                ))}
                                {config.renderLayout(element)}
                            </React.Fragment>
                        ),
                    })),
                )}
            />
        </RouterContext.Provider>
    );
}
