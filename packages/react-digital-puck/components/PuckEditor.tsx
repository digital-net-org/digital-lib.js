import React from 'react';
import { type Config, type Data, Puck } from '@measured/puck';
import { type Entity } from '../../core';
import { useClassName } from '../../react-digital';
import { useIDbStore } from '../../react-digital-idb';
import { Box, Editor, Icon } from '../../react-digital-ui';
import PuckData from '../PuckData';
import { type Tool, Tools } from './Tools';
import PuckRender from './PuckRender';
import EntityRender from './EntityRender';
import usePuckCrud from './usePuckCrud';
import usePuckUrlState from './usePuckUrlState';
import './PuckEditor.styles.css';

export interface PuckEditorProps<T extends Entity> {
    accessor: keyof T;
    store: string;
    config: Config;
    renderEntityName: (entity: T | undefined) => string;
    renderToolName: (toolId: Tool['id']) => string;
    onCreate: () => Partial<T>;
}

/**
 * PuckEditor component. Wrapper for the Measured Puck editor.
 * @param accessor - Entity key name of the data to be edited.
 * @param store - IndexedDB store/api name.
 * @param config - Puck configuration.
 * @param renderEntityName - Function to render the entity name.
 * @param renderToolName - Function to render the tool name.
 * @param onCreate - Build the default entity payload.
 */
export default function<T extends Entity>(props: PuckEditorProps<T>) {
    // NOTE: This is a workaround to handle Puck state has Puck only provide support for default values.
    // Handles Puck data changes and saves them to the IndexedDB store, if the call is triggered by an entity change,
    // it won't save the data to the store.
    const [selected, setSelected] = React.useState<string | undefined>();
    const { save } = useIDbStore<T>(props.store);

    const handleDataChange = async ({ id, ...data }: Data) => {
        if (!id) { // Use puck hook to handle this, this should no longer be necessary
            return;
        } else if (id !== selected) {
            setSelected(id);
            return;
        }
        await save({ id, [props.accessor]: PuckData.stringify(data) } as Partial<T>);
    };

    return (
        <Puck data={PuckData.default} config={props.config} onChange={handleDataChange}>
            <PuckEditor {...props} />
        </Puck>
    );
}

function PuckEditor<T extends Entity>({
    store,
    accessor,
    renderEntityName,
    renderToolName,
    onCreate,
}: PuckEditorProps<T>) {
    const { currentTool, currentEntity, dispatch } = usePuckUrlState();

    const iDbStore = useIDbStore<T>(store);
    const className = useClassName({}, 'PuckEditor');

    const { entity, entities, isLoading, _delete, patch, create } = usePuckCrud({
        store,
        accessor,
        currentEntity,
        onReset: () => dispatch('reset'),
    });

    const handleCreate = React.useCallback(
        async () => create(onCreate()),
        [create, onCreate],
    );
    
    const handleDelete = React.useCallback(
        async () => entity && !isLoading ? _delete(entity.id) : void 0,
        [entity, isLoading, _delete],
    );

    const handlePatch = React.useCallback(
        async () => {
            if (!entity || !accessor || isLoading) {
                return;
            }
            const stored = await iDbStore.get(entity.id);
            if (!stored) {
                return;
            }
            patch(entity.id, { ...stored, data: stored[accessor] });
        },
        [accessor, entity, iDbStore, isLoading, patch],
    );
    
    return (
        <Editor<T>
            className={className}
            entity={entity}
            renderName={renderEntityName}
            isLoading={isLoading}
            actions={[
                {
                    action: handlePatch,
                    icon: Icon.FloppyIcon,
                    disabled: isLoading,
                },
                {
                    action: handleDelete,
                    icon: Icon.TrashIcon,
                    disabled: !entity || isLoading,
                },
            ]}
            tools={
                Tools.map(tool => ({
                    ...tool,
                    selected: currentTool?.id === tool.id,
                    onSelect: () => dispatch('setTool', tool.id),
                }))
            }
        >
            {(() => {
                if (currentTool?.id === 'model-selector') {
                    return (
                        <Tools.Selector
                            renderEntityName={renderEntityName}
                            renderToolName={renderToolName}
                            isLoading={isLoading}
                            entity={entity}
                            entities={entities}
                            onSelect={id => dispatch('setEntity', id)}
                            actions={[
                                {
                                    action: handleCreate,
                                    icon: Icon.AddIcon,
                                    disabled: isLoading,
                                },
                            ]}
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
        </Editor>
    );
}
