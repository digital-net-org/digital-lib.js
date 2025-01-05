import React from 'react';
import { useFirstRender } from '../Effect';
import useUrlParams from './useUrlParams';

/**
 * Hook to manage a state in the URL.
 * @param accessor The name of the state.
 * @param defaultValue The default value of the state.
 * @returns A tuple with the current value of the state and a function to update it.
 */
export default function useUrlState(accessor: string, defaultValue?: any): [string, (value?: any) => void] {
    const [params, setParams] = useUrlParams();

    useFirstRender(() => {
        if (params[accessor] === undefined && defaultValue !== undefined) {
            setParams(prev => ({ ...prev, [accessor]: defaultValue }));
        }
    });

    const setState = React.useCallback(
        (value?: any) => {
            if (value === undefined) {
                setParams((prev) => {
                    delete prev[accessor];
                    return prev;
                });
            } else {
                setParams(prev => ({ ...prev, [accessor]: value }));
            }
        },
        [accessor, setParams],
    );

    return [params[accessor], setState];
}
