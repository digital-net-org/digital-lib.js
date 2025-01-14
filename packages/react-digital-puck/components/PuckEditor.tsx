import React from 'react';
import { type Data, type Config, Puck } from '@measured/puck';
import { type Entity } from '../../core';
import { useClassName, useUrlSelect, useUrlState } from '../../react-digital';
import { useIDbStore } from '../../react-digital-idb';
import { Editor, Box, Icon } from '../../react-digital-ui';
import PuckData from '../PuckData';
import { type Tool, ToolRender, tools } from './Tools';
import PuckRender from './PuckRender';
import EntityRender from './EntityRender';
import './PuckEditor.styles.css';
import usePuckState from './usePuckState';
import usePuckCrud from './usePuckCrud';

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
    const [selectedEntityId, selectEntity] = useUrlState('entity');
    const [SelectedTool, selectTool] = useUrlSelect(tools, { store: 'tool', accessor: 'id' });

    const iDbStore = useIDbStore<T>(store);
    const className = useClassName({}, 'PuckEditor');

    const {
        entity,
        entities,
        isLoading,
        ...puckCrud
    } = usePuckCrud({ store, accessor, selectEntity, selectedEntityId });

    const handleCreate = React.useCallback(
        async () => puckCrud.create(onCreate()),
        [puckCrud.create, onCreate],
    );
    
    const handleDelete = React.useCallback(
        async () => entity && !isLoading ? puckCrud.delete(entity.id) : void 0,
        [puckCrud.delete, entity, isLoading],
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
            puckCrud.patch(entity.id, { ...stored, data: stored[accessor] });
        },
        [accessor, entity, iDbStore, isLoading, puckCrud.patch],
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
                tools.map(tool => ({
                    ...tool,
                    selected: SelectedTool?.id === tool.id,
                    onSelect: () => selectTool(tool),
                }))
            }
        >
            <ToolRender
                id={SelectedTool?.id}
                accessor={accessor}
                store={store}
                renderEntityName={renderEntityName}
                renderToolName={renderToolName}
                isLoading={isLoading}
                entity={entity}
                entities={entities}
                selectedEntityId={selectedEntityId}
                selectEntity={selectEntity}
                actions={[
                    {
                        action: handleCreate,
                        icon: Icon.AddIcon,
                        disabled: isLoading,
                    },
                ]}
            />
            <Box direction="row" fullHeight fullWidth>
                {SelectedTool && !SelectedTool.isDefault
                    ? (<PuckRender />)
                    : (<EntityRender entity={entity} store={store} />)}
            </Box>
        </Editor>
    );
}
