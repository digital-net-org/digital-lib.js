import * as React from 'react';
import { ErrorView } from '../Application';
import { LoginView } from '../../react-digital-user';
import { type RouteObject } from './RouteObject';

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
