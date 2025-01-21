import React from 'react';
import { type Entity } from '../../core';
import { useIDbStore } from '../../react-digital-idb';
import { Box, Icon } from '../../react-digital-ui';
import { type PuckEditorProps } from './PuckEditor';
import { Tools } from './Tools';
import PuckRender from './PuckRender';
import EntityRender from './EntityRender';
import usePuckUrlState from './usePuckUrlState';
import usePuckState from './usePuckState';
import './PuckEditor.styles.css';

interface PuckEditorContentProps<T extends Entity> {
    accessor: PuckEditorProps<T>['accessor'];
    store: PuckEditorProps<T>['store'];
    renderEntityName: PuckEditorProps<T>['renderEntityName'];
    renderToolName: PuckEditorProps<T>['renderToolName'];
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
    renderToolName,
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
                console.log('%c reset puck state', 'color: red');
                return setPuckState(undefined);
            }
            if (entity && entity.id !== puckState.id) {
                console.log('%c set puck state', 'color: green');
                const stored = await iDbStore.get(entity?.id);
                setPuckState(stored?.[accessor] ?? entity[accessor], entity.id);
            }
        })();
    }, [accessor, entity, iDbStore, isLoading, puckState.id, setPuckState]);

    return (
        <React.Fragment>
            {(() => {
                if (currentTool?.id === 'model-selector') {
                    return (
                        <Tools.Selector
                            renderEntityName={renderEntityName}
                            renderToolName={renderToolName}
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
                    return <Tools.Tree renderToolName={renderToolName} />;
                }
                if (currentTool?.id === 'components') {
                    return <Tools.Components renderToolName={renderToolName} />;
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
