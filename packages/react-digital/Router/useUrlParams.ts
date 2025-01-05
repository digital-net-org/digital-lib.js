import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

type Params = Record<string, string>;

/**
 * Hook to manage URL parameters.
 * @returns A tuple with the current URL parameters and a function to update them.
 */
export default function useUrlParams(): [Params, (value: Params | ((prev: Params) => Params)) => void] {
    const { search } = useLocation();
    const navigate = useNavigate();

    const params = React.useMemo(() => Object.fromEntries(new URLSearchParams(search).entries()) as Params, [search]);

    const setParams = React.useCallback(
        (value: Params | ((prev: Params) => Params)) => {
            navigate({
                search: new URLSearchParams(typeof value === 'function' ? value(params) : value).toString(),
            });
        },
        [navigate, params],
    );

    return [params, setParams];
}
