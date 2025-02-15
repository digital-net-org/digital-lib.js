import React from 'react';
import type { Entity, EntitySchema } from '../../dto';
import { useIDbStore } from '../../react-digital';
import { Box } from '../../react-digital-ui';
import usePuckState from './usePuckState';

interface Props<T extends Entity> {
    store: string;
    entity: T | undefined;
    schema?: EntitySchema;
}

export default function EntityRender<T extends Entity>({ store, entity, schema }: Props<T>) {
    const [stored, setStored] = React.useState<T | undefined>(undefined);
    const iDbStore = useIDbStore<T>(store);
    const [puckState] = usePuckState();

    React.useEffect(() => {
        if (stored?.id === entity?.id) {
            return;
        } else if (!entity) {
            setStored(undefined);
            return;
        }
        (async () => setStored({ ...entity, ...(await iDbStore.get(entity.id)) }))();
    }, [entity, iDbStore, stored]);

    return (
        <Box overflow="auto" fullHeight fullWidth>
            <h4>View Config</h4>
            <pre>{JSON.stringify(stored ?? entity, null, 2)}</pre>
            <pre>{JSON.stringify(puckState, null, 2)}</pre>
            {stored ? <pre>{JSON.stringify(schema ?? {}, null, 2)}</pre> : null}
        </Box>
    );
}
