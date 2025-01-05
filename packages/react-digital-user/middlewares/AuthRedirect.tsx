import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDigitalRouter } from '../../react-digital';
import { useDigitalUser } from '../DigitalUser';
import type { DigitalUserConfig } from '../config';

export default function AuthRedirect({ routerOptions }: DigitalUserConfig) {
    const navigate = useNavigate();
    const { current } = useDigitalRouter();
    const { isLogged, isUnauthorized } = useDigitalUser();

    React.useEffect(() => {
        if (isUnauthorized) {
            navigate(routerOptions.logoutRedirect);
        };
        if (isLogged && current?.path === (routerOptions.logoutRedirect)) {
            navigate(routerOptions?.loginRedirect);
        };
    }, [
        isLogged,
        navigate,
        current?.path,
        isUnauthorized,
        routerOptions?.logoutRedirect,
        routerOptions?.loginRedirect,
    ]);

    return null;
}
