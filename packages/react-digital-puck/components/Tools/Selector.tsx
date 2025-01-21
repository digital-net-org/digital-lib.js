import React from 'react';
import { t } from 'i18next';
import type { Entity } from '../../../core';
import { useClassName } from '../../../react-digital';
import { type EditorProps, BaseTool, Button, Text, Box } from '../../../react-digital-ui';
import { type PuckEditorProps } from '../PuckEditor';

interface Props<T extends Entity> {
    renderEntityName: PuckEditorProps<T>['renderEntityName'];
    renderToolName: (id: string) => string;
    actions: EditorProps['actions'];
    entity: T | undefined;
    entities: Array<T>;
    onSelect: (id: T['id']) => void;
    isLoading: boolean;
    modifiedStates: Record<string, boolean>;
}

export default function Selector<T extends Entity>({
    renderEntityName,
    renderToolName,
    actions,
    entity,
    entities,
    onSelect,
    isLoading,
    modifiedStates,
}: Props<T>) {
    const className = useClassName({}, 'Selector');

    return (
        <BaseTool
            title={renderToolName('model-selector')}
            actions={actions}
        >
            <div className={className}>
                {(entities ?? []).map(e => (
                    <Button
                        key={e.id}
                        variant="icon"
                        disabled={isLoading}
                        fullWidth
                        selected={e.id === entity?.id}
                        onClick={() => !isLoading ? onSelect(e.id) : void 0}
                    >
                        <Box direction="row" align="center" gap={1}>
                            {renderEntityName(e)}
                            {modifiedStates[e.id] && (
                                <Text italic size="small">
                                    {t('puck:state.modified')}
                                </Text>
                            )}
                        </Box>
                    </Button>
                ))}
            </div>
        </BaseTool>
    );
}
