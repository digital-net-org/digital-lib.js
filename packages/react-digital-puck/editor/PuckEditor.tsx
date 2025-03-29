import { type Data, Puck } from '@measured/puck';
import React from 'react';
import type { Entity } from '../../dto';
import { useClassName } from '../../core';
import { useIDbStore, useStoredEntity } from '../../react-digital';
import { Editor, Icon } from '../../react-digital-ui';
import { config } from '../library';
import { Tools } from './Tools';
import PuckDataHelper from './PuckDataHelper';
import PuckEditorContent from './PuckEditorContent';
import PuckEditorHeader from './PuckEditorHeader';
import usePuckCrud from './usePuckCrud';
import usePuckUrlState from './usePuckUrlState';
import './PuckEditor.styles.css';

export interface PuckEditorProps<T extends Entity> {
    accessor: keyof T;
    store: string;
    renderEntityName: (entity: T | undefined) => string;
    onCreate: () => Partial<T>;
}

/**
 * PuckEditor component. Wrapper for the Measured Puck editor.
 * @param accessor - Entity key name of the data to be edited.
 * @param store - IndexedDB store/api name.
 * @param renderEntityName - Function to render the entity name.
 * @param onCreate - Build the default entity payload.
 */
export default function PuckEditor<T extends Entity>({
    accessor,
    store,
    renderEntityName,
    onCreate,
}: PuckEditorProps<T>) {
    const { currentEntity, currentTool, dispatchUrlState } = usePuckUrlState();

    const iDbStore = useIDbStore<T>(store);
    const { storedExists } = useStoredEntity<T>(store, currentEntity);
    const className = useClassName({}, 'PuckEditor');

    const { entity, entities, isLoading, _delete, patch, create } = usePuckCrud<T>(store, () =>
        dispatchUrlState('reset')
    );

    const handleCreate = React.useCallback(async () => create(onCreate()), [create, onCreate]);

    const handleDelete = React.useCallback(
        async () => (entity && !isLoading ? _delete(entity.id) : void 0),
        [entity, isLoading, _delete]
    );

    const handlePatch = React.useCallback(async () => {
        if (!entity || !accessor || isLoading) {
            return;
        }
        const stored = await iDbStore.get(entity.id);
        if (!stored) {
            return;
        }
        patch(entity.id, { ...stored, data: JSON.stringify(stored[accessor]) });
    }, [accessor, entity, iDbStore, isLoading, patch]);

    const handlePuckChange = async (data: Data) => {
        if (isLoading || !(data.id && currentEntity && entity) || data.id !== entity?.id) {
            return;
        }
        if (!PuckDataHelper.deepEquality(data, entity[accessor])) {
            await iDbStore.save({ id: data.id, [accessor]: data } as Partial<T>);
        } else {
            await iDbStore.delete(entity.id);
        }
    };

    return (
        <Puck data={PuckDataHelper.default} config={config} onChange={handlePuckChange}>
            <Editor
                className={className}
                renderName={() => <PuckEditorHeader name={renderEntityName(entity)} isCurrentMutated={storedExists} />}
                isLoading={isLoading}
                actions={[
                    {
                        action: handlePatch,
                        icon: Icon.FloppyIcon,
                        disabled: isLoading || !(entity && storedExists),
                    },
                    {
                        action: handleDelete,
                        icon: Icon.TrashIcon,
                        disabled: !entity || isLoading,
                    },
                ]}
                tools={Tools.map(tool => ({
                    ...tool,
                    selected: currentTool?.id === tool.id,
                    onSelect: () => dispatchUrlState('setTool', tool.id),
                }))}
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
