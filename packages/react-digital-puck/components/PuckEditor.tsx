import React from 'react';
import { type Config, type Data, Puck } from '@measured/puck';
import { type Entity, ObjectMatcher } from '../../core';
import { useClassName } from '../../react-digital';
import { useIDbStore } from '../../react-digital-idb';
import { Editor, Icon } from '../../react-digital-ui';
import PuckData from '../PuckData';
import { type Tool, Tools } from './Tools';
import usePuckCrud from './usePuckCrud';
import usePuckUrlState from './usePuckUrlState';
import PuckEditorContent from './PuckEditorContent';
import './PuckEditor.styles.css';

export interface PuckEditorProps<T extends Entity> {
    accessor: keyof T;
    store: string;
    config: Config;
    renderEntityName: (entity: T | undefined) => string;
    renderToolName: (toolId: Tool['id']) => string;
    onCreate: () => Partial<T>;
    isModified: boolean;
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
export default function PuckEditor<T extends Entity>({
    accessor,
    config,
    store,
    renderEntityName,
    renderToolName,
    onCreate,
    isModified,
}: PuckEditorProps<T>) {
    const iDbStore = useIDbStore<T>(store);
    const className = useClassName({}, 'PuckEditor');

    const { currentEntity, currentTool, dispatchUrlState } = usePuckUrlState();
    const { entity, entities, isLoading, _delete, patch, create } = usePuckCrud<T>(
        store,
        () => dispatchUrlState('reset'),
    );

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
            patch(entity.id, { ...stored, data: JSON.stringify(stored[accessor]) });
        },
        [accessor, entity, iDbStore, isLoading, patch],
    );

    const handlePuckChange = async (data: Data) => {
        if (isLoading || !(data.id && currentEntity && entity) || data.id !== entity?.id) {
            return;
        }
        const entityString = entity[accessor] as Data;
        const entityObject = JSON.parse(entityString.toString());
        if (!ObjectMatcher.deepEquality(data, entityObject)) {
            console.log('data', data);
            console.log('entity', entityObject);
            await iDbStore.save({ id: data.id, [accessor]: data } as Partial<T>);
        } else {
            await iDbStore.delete(entity.id);
        }
    };

    return (
        <Puck data={PuckData.default} config={config} onChange={handlePuckChange}>
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
                        onSelect: () => dispatchUrlState('setTool', tool.id),
                    }))
                }
            >
                <PuckEditorContent
                    accessor={accessor}
                    store={store}
                    renderEntityName={renderEntityName}
                    renderToolName={renderToolName}
                    onCreate={handleCreate}
                    isLoading={isLoading}
                    entity={entity}
                    entities={entities}
                />
            </Editor>
        </Puck>
    );
}
