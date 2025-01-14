import React from 'react';
import useUrlState from './useUrlState';

// TODO ISSUE#1: Remove this
export interface SelectOptions<T extends object> {
    store: string;
    accessor: keyof T;
}

export default function useUrlSelect<T extends object>(
    options: Array<T>,
    { accessor, store }: SelectOptions<T>,
) {
    const [stateId, setStateId] = useUrlState(store, options[0][accessor]);

    const value = React.useMemo(
        () => options.find(item => item[accessor] === stateId),
        [accessor, options, stateId],
    );

    const handleSetValue = React.useCallback(
        (value: T[typeof accessor] | undefined) => setStateId(value),
        [setStateId],
    );

    React.useEffect(
        () => !value && stateId ? setStateId(undefined) : void 0,
        [value, stateId, setStateId],
    );

    return [value, handleSetValue] as const;
};
