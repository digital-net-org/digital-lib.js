import React from 'react';
import type { Entity } from '../../core';
import { useStoredEntity } from '../../react-digital-idb';
import { Box } from '../../react-digital-ui';

interface Props<T extends Entity> {
    store: string;
    entity: T | undefined;
}

export default function EntityRender<T extends Entity>({ store, entity }: Props<T>) {
    const { stored } = useStoredEntity<T>(entity, store);

    return (
        <Box>
            <h4>View Config</h4>
            <pre>{JSON.stringify(stored ?? entity, null, 2)}</pre>
        </Box>
    );
}
