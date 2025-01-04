import React, { type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDigitalUser } from '../react-digital-user';
import useDigitalRouter from './useDigitalRouter';
import type { RouterConfig } from './DigitalRouterProvider';

export interface RouteRenderState {
    isPublic?: boolean;
    isLogged?: boolean;
}

export interface RouteRenderProps extends PropsWithChildren {
    isPublic?: boolean;
    appUrls: Omit<RouterConfig['appUrls'], 'public'>;
    documentName: string;
    renderLayout?: (state: RouteRenderState) => React.ReactNode;
}

export default function RouteRender({
    children,
    appUrls,
    documentName,
    renderLayout,
    isPublic = false,
}: RouteRenderProps) {
    const navigate = useNavigate();
    const { current } = useDigitalRouter();
    const { isLogged } = useDigitalUser();

    const unauthorized = React.useMemo(() => !isLogged() && !isPublic, [isLogged, isPublic]);

    React.useEffect(() => {
        if (unauthorized) {
            navigate(appUrls.login);
        };
        if (isLogged() && current?.path === appUrls.login) {
            navigate(appUrls.home ?? '/');
        };
    }, [
        isLogged,
        navigate,
        current?.path,
        unauthorized,
        appUrls,
    ]);

    React.useEffect(() => {
        const suffix = current?.label ? `|${current?.label}` : '';
        document.title = `${documentName}${suffix}`;
    }, [current?.label, documentName]);

    return (
        <React.Fragment>
            {renderLayout !== undefined ? renderLayout({ isLogged: isLogged(), isPublic }) : null}
            {!unauthorized ? children : null}
        </React.Fragment>
    );
}
