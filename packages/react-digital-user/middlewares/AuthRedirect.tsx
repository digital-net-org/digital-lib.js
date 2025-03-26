import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDigitalRouter } from '../../react-digital';
import { useDigitalUser } from '../DigitalUser';

export default function AuthRedirect() {
    const navigate = useNavigate();
    const { current } = useDigitalRouter();
    const { isLogged, isUnauthorized } = useDigitalUser();

    React.useEffect(() => {
        if (isUnauthorized) {
            navigate(ROUTER_LOGIN);
        }
        if (isLogged && current?.path === ROUTER_LOGIN) {
            navigate(ROUTER_HOME);
        }
    }, [isLogged, navigate, current?.path, isUnauthorized]);

    return null;
}
