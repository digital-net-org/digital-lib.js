import type { Entity } from '../../../dto';
import { useStoredEntity } from '../../../react-digital-idb';
import { Box, Button, Icon } from '../../../react-digital-ui';
import type { PuckEditorProps } from '../PuckEditor';

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
            onClick={() => (!isLoading ? onSelect(entity.id) : void 0)}
        >
            <Box direction="row" align="center" justify="space-between" fullWidth gap={1}>
                {renderEntityName(entity)}
                {storedExists && <Icon.CircleFill size="x-small" />}
            </Box>
        </Button>
    );
}
