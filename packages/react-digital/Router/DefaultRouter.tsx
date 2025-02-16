import { RouteObject } from './RouteObject';
import { ErrorView, LoginView } from '../../react-digital-ui';
import * as React from 'react';

export default [
    {
        path: '/login',
        element: <LoginView />,
        isPublic: true,
        displayed: false,
    },
    {
        path: '*',
        element: <ErrorView error="404" />,
        isPublic: false,
        displayed: false,
    },
] satisfies Array<RouteObject>;
