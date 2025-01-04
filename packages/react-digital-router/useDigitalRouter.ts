import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { RouterContext } from './DigitalRouterProvider';

/**
 * Hook to manage the router.
 * @returns A tuple with the router and the current route.
 */
export default function useDigitalRouter() {
    const { router: contextRouter, appUrls } = React.useContext(RouterContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const current = React.useMemo(() => {
        const route = (contextRouter ?? [])
            .sort((a, b) => b.path.length - a.path.length)
            .find(({ path }) => pathname.includes(path));

        return route
            ? {
                    ...route,
                    element: undefined,
                    label: t(`router:page.title.${route.path}`),
                    navigate: () => navigate(route.path),
                    isCurrent: pathname === route.path,
                }
            : undefined;
    }, [contextRouter, navigate, pathname]);

    const router = React.useMemo(
        () =>
            (contextRouter ?? []).map(({ element: _, ...route }) => ({
                label: t(`router:page.title.${route.path}`),
                navigate: () => navigate(route.path),
                isCurrent: pathname === route.path,
                ...route,
            })),
        [contextRouter, navigate, pathname],
    );

    return { router, current, appUrls };
}
