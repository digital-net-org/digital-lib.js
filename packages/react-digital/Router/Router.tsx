import * as React from 'react';
import { createBrowserRouter, RouterProvider as ReactRouter } from 'react-router-dom';
import RouterBuilder from './builder/RouterBuilder';
import type { RouteObject } from './RouteObject';
import { LoginView } from '../../react-digital-user';
import DefaultRouter from './DefaultRouter';

export interface RouterProps {
    middlewares?: React.ReactNode[];
    router: Array<RouteObject>;
    renderLayout: (element: React.ReactNode) => React.ReactNode;
}

export const RouterContext = React.createContext<Omit<RouterProps, 'middlewares' | 'renderLayout'>>({
    router: [],
});

export default function Router({ middlewares, renderLayout, router }: RouterProps) {
    const resolved = React.useMemo(() => [...(router ?? []), ...RouterBuilder.build(), ...DefaultRouter], [router]);

    return (
        <RouterContext.Provider value={{ router: resolved }}>
            <ReactRouter
                router={createBrowserRouter(
                    resolved.map(({ element, path }) => ({
                        path,
                        element: (
                            <React.Fragment>
                                {(middlewares ?? []).map(middleware =>
                                    React.createElement(React.Fragment, {
                                        children: middleware,
                                        key: (middleware as { type: React.JSXElementConstructor<any> }).type.name,
                                    })
                                )}
                                {renderLayout(element)}
                            </React.Fragment>
                        ),
                    }))
                )}
            />
        </RouterContext.Provider>
    );
}
