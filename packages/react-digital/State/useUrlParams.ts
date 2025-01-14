import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

type Params = Record<string, string>; // <= Should be generic, it's the state of the URL

/*
* TODO ISSUE#1
* Usage:
*   interface T {
*    maValeur: string;
*    monAutreValeur: object;
*  }
*
*   const [urlState, setUrlState] = useUrlParams<T>();
*   setUrlState((prev: T) => ({ ...prev, maValeur: value }));
*
* Main goal is to handle undefined values in the URL state and return object with the right type.
*/

/**
 * Hook to manage URL parameters.
 * @returns A tuple with the current URL parameters and a function to update them.
 */
export default function useUrlParams(): [Params, (value: Params | ((prev: Params) => Params)) => void] {
    const location = useLocation();
    const navigate = useNavigate();

    const params = React.useMemo(
        () => Object.fromEntries(new URLSearchParams(location.search).entries()) as Params, 
        [location.search],
    );

    const setParams = React.useCallback(
        (value: Params | ((prev: Params) => Params)) => {
            navigate(
                {
                    hash: location.hash,
                    search: new URLSearchParams(
                        typeof value === 'function' 
                            ? value(Object.fromEntries(new URLSearchParams(location.search).entries()))
                            : value,
                    ).toString(),
                },
                { 
                    replace: true,
                    state: location.state,
                },
            );
        },
        [navigate, location.hash, location.search, location.state],
    );

    return [params, setParams];
}
