import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDigitalRouter } from '../../react-digital';
import { useDigitalUser } from '../DigitalUser';
import { config } from '../config';

export default function AuthRedirect() {
    const navigate = useNavigate();
    const { current } = useDigitalRouter();
    const { isLogged, isUnauthorized } = useDigitalUser();

    React.useEffect(() => {
        if (isUnauthorized) {
            navigate(config.router.login);
        }
        if (isLogged && current?.path === config.router.login) {
            navigate(config.router.home);
        }
    }, [isLogged, navigate, current?.path, isUnauthorized]);

    return null;
}
