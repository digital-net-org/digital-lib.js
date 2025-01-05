import React from 'react';
import useUrlState from './useUrlState';

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
        [accessor, stateId, options],
    );

    const setValue = React.useCallback(
        (value: T) => setStateId(value[accessor] === stateId ? undefined : value[accessor]),
        [accessor, setStateId],
    );

    return [value, setValue] as const;
};
