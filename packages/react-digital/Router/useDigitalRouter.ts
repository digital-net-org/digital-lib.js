import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouterContext } from './Router';

export interface DigitalRoute {
    path: string;
    navigate: () => void;
    isCurrent: boolean;
}

/**
 * Hook to manage the router.
 * @returns A tuple with the router and the current route.
 */
export default function useDigitalRouter() {
    const { router: contextRouter } = React.useContext(RouterContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const current: DigitalRoute | undefined = React.useMemo(() => {
        const path = (contextRouter ?? [])
            .sort((a, b) => b.path.length - a.path.length)
            .find(({ path }) => pathname.includes(path))?.path;
        return path
            ? {
                    path,
                    isCurrent: true,
                    navigate: () => navigate(path),
                }
            : undefined;
    }, [
        contextRouter,
        pathname,
        navigate,
    ]);

    const router: Array<DigitalRoute> = React.useMemo(
        () =>
            (contextRouter ?? []).map(({ element: _, ...route }) => ({
                navigate: () => navigate(route.path),
                isCurrent: pathname === route.path,
                ...route,
            })),
        [
            contextRouter,
            pathname,
            navigate,
        ],
    );

    return { router, current };
}
