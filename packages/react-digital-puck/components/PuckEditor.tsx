import React from 'react';
import { t } from 'i18next';
import { type Config, type Data, Puck } from '@measured/puck';
import { type Entity } from '../../core';
import { useClassName } from '../../react-digital';
import { IDbStore, useIDbStore, useStoredEntity } from '../../react-digital-idb';
import { Box, Editor, Icon, Text } from '../../react-digital-ui';
import PuckData from '../PuckData';
import { Tools } from './Tools';
import usePuckCrud from './usePuckCrud';
import usePuckUrlState from './usePuckUrlState';
import PuckEditorContent from './PuckEditorContent';
import './PuckEditor.styles.css';
import PuckEditorHeader from './PuckEditorHeader';

export interface PuckEditorProps<T extends Entity> {
    accessor: keyof T;
    store: string;
    config: Config;
    renderEntityName: (entity: T | undefined) => string;
    onCreate: () => Partial<T>;
}

/**
 * PuckEditor component. Wrapper for the Measured Puck editor.
 * @param accessor - Entity key name of the data to be edited.
 * @param store - IndexedDB store/api name.
 * @param config - Puck configuration.
 * @param renderEntityName - Function to render the entity name.
 * @param onCreate - Build the default entity payload.
 */
export default function PuckEditor<T extends Entity>({
    accessor,
    config,
    store,
    renderEntityName,
    onCreate,
}: PuckEditorProps<T>) {
    const { currentEntity, currentTool, dispatchUrlState } = usePuckUrlState();

    const iDbStore = useIDbStore<T>(store);
    const { storedExists } = useStoredEntity<T>(store, currentEntity);
    const className = useClassName({}, 'PuckEditor');

    const [isCurrentMutated, setIsCurrentMutated] = React.useState(storedExists);

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
            setIsCurrentMutated(false);
        },
        [accessor, entity, iDbStore, isLoading, patch],
    );

    const handlePuckChange = async (data: Data) => {
        if (isLoading || !(data.id && currentEntity && entity) || data.id !== entity?.id) {
            return;
        }
        if (!PuckData.deepEquality(data, entity[accessor])) {
            await iDbStore.save({ id: data.id, [accessor]: data } as Partial<T>);
            setIsCurrentMutated(true);
        } else {
            await iDbStore.delete(entity.id);
            setIsCurrentMutated(false);
        }
    };

    return (
        <Puck data={PuckData.default} config={config} onChange={handlePuckChange}>
            <Editor
                className={className}
                renderName={() => (
                    <PuckEditorHeader
                        name={renderEntityName(entity)}
                        isCurrentMutated={isCurrentMutated && currentEntity}
                    />
                )}
                isLoading={isLoading}
                actions={[
                    {
                        action: handlePatch,
                        icon: Icon.FloppyIcon,
                        disabled: isLoading || !(entity && isCurrentMutated),
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
                    onCreate={handleCreate}
                    isLoading={isLoading}
                    entity={entity}
                    entities={entities}
                />
            </Editor>
        </Puck>
    );
}
