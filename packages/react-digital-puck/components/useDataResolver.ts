import React from 'react';
import { Data, Puck } from '@measured/puck';
import { type Entity, ObjectMatcher } from '../../core';

import type { useIDbStore } from '../../react-digital-idb';
import useDigitalPuck from './useDigitalPuck';
import PuckData from '../PuckData';

interface Props<T extends Entity> {
    accessor: keyof T;
    entity: T | undefined;
    iDbStore: ReturnType<typeof useIDbStore<T>>;
    isLoading: boolean;
}

export default function useDataResolver<T extends Entity>({
    accessor,
    entity,
    iDbStore,
    isLoading,
}: Props<T>) {
    const { dispatchData, data } = useDigitalPuck();

    React.useEffect(() => {
        (async () => {
            if (!entity || isLoading || iDbStore.isLoading || entity.id === data.id) {
                return;
            }
            const stored = await iDbStore.get(entity.id);
            const resolved = stored?.[accessor]
                ? stored[accessor]
                : entity[accessor];

            if (!resolved) {
                return;
            }
            dispatchData({
                id: String(entity.id),
                ...(PuckData.fromStoredData(resolved)),
            });
        })();
    }, [accessor, data, dispatchData, entity, iDbStore, isLoading]);

    const hasChanged = React.useMemo(
        () => {
            return entity && accessor && entity?.[accessor] !== PuckData.toStoredData(data);
        },
        [accessor, data, entity],
    );

    return {
        hasChanged,
    };
}
