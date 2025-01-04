import React from 'react';
import { useFirstRender } from '../react-digital';
import useUrlParams from './useUrlParams';

/**
 * Hook to manage a state in the URL.
 * @param stateName The name of the state.
 * @param defaultValue The default value of the state.
 * @returns A tuple with the current value of the state and a function to update it.
 */
export default function useUrlState(stateName: string, defaultValue?: any): [string, (value?: any) => void] {
    const [params, setParams] = useUrlParams();

    useFirstRender(() => {
        if (params[stateName] === undefined && defaultValue !== undefined) {
            setParams(prev => ({ ...prev, [stateName]: defaultValue }));
        }
    });

    const setState = React.useCallback(
        (value?: any) => {
            if (value === undefined) {
                setParams((prev) => {
                    delete prev[stateName];
                    return prev;
                });
            } else {
                setParams(prev => ({ ...prev, [stateName]: value }));
            }
        },
        [stateName, setParams],
    );

    return [params[stateName], setState];
}
