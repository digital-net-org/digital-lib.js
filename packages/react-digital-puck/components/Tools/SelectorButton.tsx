import { Box, Button, Text } from '../../../react-digital-ui';
import { t } from 'i18next';
import React from 'react';
import type { PuckEditorProps } from '../PuckEditor';
import type { Entity } from '../../../core';
import { useStoredEntity } from '../../../react-digital-idb';

interface Props<T extends Entity> {
    renderEntityName: PuckEditorProps<T>['renderEntityName'];
    store: PuckEditorProps<T>['store'];
    entity: T;
    onSelect: (id: T['id']) => void;
    selected: boolean;
    isLoading: boolean;
}

export default function SelectorButton<T extends Entity>({
    renderEntityName,
    entity,
    onSelect,
    selected,
    isLoading,
    store,
}: Props<T>) {
    const { storedExists } = useStoredEntity<T>(store, entity?.id);

    return (
        <Button
            key={entity?.id}
            variant="icon"
            disabled={isLoading}
            selected={selected}
            fullWidth
            onClick={() => !isLoading ? onSelect(entity.id) : void 0}
        >
            <Box direction="row" align="center" gap={1}>
                {renderEntityName(entity)}
                {storedExists && (
                    <Text italic size="small">
                        {t('puck:state.modified')}
                    </Text>
                )}
            </Box>
        </Button>
    );
}
