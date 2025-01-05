import React from 'react';
import { type Entity } from '../../core';
import { type useCrud } from '../../react-digital-client';
import { useUrlState } from '../../react-digital';

interface Props<T extends Entity> {
    entity: T | undefined;
    get: ReturnType<typeof useCrud<T>>['get'];
    isLoading: boolean;
}

export default function useEntitySelector<T extends Entity>({ entity, get, isLoading }: Props<T>) {
    const [currentEntity, setCurrentEntity] = useUrlState('entity');

    React.useEffect(() => {
        if (!currentEntity || (currentEntity === entity?.id) || isLoading) {
            return;
        }
        get(String(currentEntity));
    }, [currentEntity, isLoading, get, entity?.id]);

    const setEntity = React.useCallback(
        (id?: Entity['id']) => setCurrentEntity(id ? String(id) : undefined),
        [setCurrentEntity],
    );

    return {
        currentEntityId: currentEntity,
        setEntity,
    };
}
