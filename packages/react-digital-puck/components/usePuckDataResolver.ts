import React from 'react';
import { type Data } from '@measured/puck';
import { type Entity } from '../../core';
import usePuck from '../usePuck';

interface Props<T extends Entity> {
    entity: T | undefined;
    editEntity: (entity: Partial<T>) => void;
    accessor: keyof T;
}

export default function usePuckDataResolver<T extends Entity>({ accessor, entity, editEntity }: Props<T>) {
    const { data, id, setPuckData } = usePuck();

    React.useEffect(() => {
        if (!entity || (id && id === entity?.id)) {
            return;
        }
        setPuckData(entity[accessor] as Data, entity.id);
    });

    React.useEffect(() => {
        if (!id || id !== entity?.id) {
            return;
        }
        editEntity({ [accessor]: data } as Partial<T>);
    }, [data, accessor, editEntity, id, entity]);
}
