import React from 'react';
import { t } from 'i18next';
import { type Entity } from '../../core';
import { useIDbStore } from '../../react-digital-idb';
import { Box, Icon } from '../../react-digital-ui';
import { type PuckEditorProps } from './PuckEditor';
import { type Tool, Tools } from './Tools';
import PuckRender from './PuckRender';
import EntityRender from './EntityRender';
import usePuckUrlState from './usePuckUrlState';
import usePuckState from './usePuckState';
import './PuckEditor.styles.css';

interface PuckEditorContentProps<T extends Entity> {
    accessor: PuckEditorProps<T>['accessor'];
    store: PuckEditorProps<T>['store'];
    renderEntityName: PuckEditorProps<T>['renderEntityName'];
    onCreate: () => void;
    isLoading: boolean;
    entity: T | undefined;
    entities: T[];
    modifiedStates: Record<string, boolean>;
}

export default function PuckEditorContent<T extends Entity>({
    store,
    accessor,
    isLoading,
    entity,
    entities,
    onCreate,
    renderEntityName,
    modifiedStates,
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
                            modifiedStates={modifiedStates}
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
                {currentTool?.id && !currentTool?.isDefault
                    ? (<PuckRender />)
                    : (<EntityRender entity={entity} store={store} />)}
            </Box>
        </React.Fragment>
    );
}
