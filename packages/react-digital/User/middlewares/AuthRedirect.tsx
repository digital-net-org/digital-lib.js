import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDigitalRouter } from '../../Router';
import { useUser } from '../User';

export default function AuthRedirect() {
    const navigate = useNavigate();
    const { current } = useDigitalRouter();
    const { isLogged } = useUser();

    React.useEffect(() => {
        if (!isLogged && !current?.isPublic) {
            navigate(ROUTER_LOGIN);
        }
        if (isLogged && current?.path === ROUTER_LOGIN) {
            navigate(ROUTER_HOME);
        }
    }, [isLogged, navigate, current]);

    return null;
}
