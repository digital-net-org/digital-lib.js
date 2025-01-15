import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

/**
 * Hook to manage URL parameters.
 * @returns A tuple with the current URL parameters and a function to update them.
 */
export default function useUrlParams<T extends Record<string, any>>(): [T, (value: T | ((prev: T) => T)) => void] {
    const location = useLocation();
    const navigate = useNavigate();

    const params = React.useMemo(
        () => Object.fromEntries(new URLSearchParams(location.search).entries()) as T,
        [location.search],
    );

    const setParams = React.useCallback(
        (value: T | ((prev: T) => T)) => {
            const resolved = typeof value === 'function'
                ? value(params)
                : value;
            Object.keys(resolved).forEach((key) => {
                if (resolved[key] === undefined) delete resolved[key];
            });
            navigate(
                {
                    search: new URLSearchParams(resolved).toString(),
                },
            );
        },
        [navigate, params],
    );

    return [params, setParams];
}
