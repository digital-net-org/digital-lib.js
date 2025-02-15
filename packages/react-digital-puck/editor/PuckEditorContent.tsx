import { t } from 'i18next';
import React from 'react';
import type { Entity } from '../../dto';
import { useIDbStore } from '../../react-digital';
import { Box, Icon } from '../../react-digital-ui';
import EntityRender from './EntityRender';
import { type PuckEditorProps } from './PuckEditor';
import './PuckEditor.styles.css';
import PuckRender from './PuckRender';
import { Tools } from './Tools';
import usePuckState from './usePuckState';
import usePuckUrlState from './usePuckUrlState';

interface PuckEditorContentProps<T extends Entity> {
    accessor: PuckEditorProps<T>['accessor'];
    store: PuckEditorProps<T>['store'];
    renderEntityName: PuckEditorProps<T>['renderEntityName'];
    onCreate: () => void;
    isLoading: boolean;
    entity: T | undefined;
    entities: T[];
    storedExists?: boolean;
}

export default function PuckEditorContent<T extends Entity>({
    store,
    accessor,
    isLoading,
    entity,
    entities,
    onCreate,
    renderEntityName,
}: PuckEditorContentProps<T>) {
    const { currentTool, dispatchUrlState } = usePuckUrlState();
    const [puckState, setPuckState] = usePuckState();
    const iDbStore = useIDbStore<T>(store);

    React.useEffect(() => {
        (async () => {
            if (isLoading || iDbStore.isLoading) {
                return;
            }
            if (!entity?.id && puckState.id) {
                return setPuckState(undefined);
            }
            if (entity && entity.id !== puckState.id) {
                const stored = await iDbStore.get(entity?.id);
                setPuckState(stored?.[accessor] ?? entity[accessor], entity.id);
            }
        })();
    }, [accessor, entity, iDbStore, isLoading, puckState.id, setPuckState]);

    const handleRenderToolName = (id: string) => t(`puck:tools.${id}.title`);

    return (
        <React.Fragment>
            {(() => {
                if (currentTool?.id === 'model-selector') {
                    return (
                        <Tools.Selector
                            renderEntityName={renderEntityName}
                            renderToolName={handleRenderToolName}
                            isLoading={isLoading}
                            entity={entity}
                            entities={entities}
                            onSelect={id => dispatchUrlState('setEntity', id)}
                            actions={[
                                {
                                    action: onCreate,
                                    icon: Icon.AddIcon,
                                    disabled: isLoading,
                                },
                            ]}
                            store={store}
                        />
                    );
                }
                if (currentTool?.id === 'tree') {
                    return <Tools.Tree renderToolName={handleRenderToolName} />;
                }
                if (currentTool?.id === 'components') {
                    return <Tools.Components renderToolName={handleRenderToolName} />;
                }
                return null;
            })()}
            <Box direction="row" fullHeight fullWidth>
                {currentTool?.id && !currentTool?.isDefault ? (
                    <PuckRender />
                ) : (
                    <EntityRender entity={entity} store={store} />
                )}
            </Box>
        </React.Fragment>
    );
}
