import React from 'react';
import type { Data } from '@measured/puck';
import type { Entity } from '../../core';
import { useClassName, useUrlSelect } from '../../react-digital';
import { useIDbStore } from '../../react-digital-idb';
import { Box, Icon } from '../../react-digital-ui';
import { Editor } from '../../react-digital-editor';
import usePuckEditor from '../context/usePuckEditor';
import useDigitalPuck from '../useDigitalPuck';
import { tools } from './Tools';
import PuckRender from './PuckRender';
import EntityRender from './EntityRender';
import './PuckEditor.styles.css';

export default function PuckEditor<T extends Entity>() {
    const [currentTool, setCurrentTool] = useUrlSelect(tools, { store: 'tool', accessor: 'id' });
    const { store, entity, patch, accessor, renderEntityName, isLoading, ...editorState } = usePuckEditor<T>();
    const iDbStore = useIDbStore<T>(store);
    const { dispatchData, data } = useDigitalPuck();
    const className = useClassName({}, 'PuckEditor');
        
    // entity?.updatedAt !== undefined && (stored?.updatedAt || entity.createdAt) < entity.updatedAt

    React.useEffect(() => {
        (async () => {
            if (!entity || isLoading || iDbStore.isLoading || entity.id === data.id) {
                return;
            }
            const stored = await iDbStore.get(entity.id);
            const resolved = stored?.[accessor] ?? entity[accessor];
            if (!resolved) {
                return;
            }
            dispatchData({ id: String(entity.id), ...(resolved as unknown as Data) });
        })();
    }, [accessor, data, dispatchData, entity, iDbStore, isLoading]);
    
    const handlePatch = React.useCallback(
        async () => {
            if (!entity || isLoading) {
                return;
            }
            const stored = await iDbStore.get(entity.id);
            patch(stored);
            await iDbStore.delete(entity.id);
        },
        [entity, iDbStore, isLoading, patch],
    );
    
    return (
        <Editor<T>
            className={className}
            entity={entity}
            renderName={renderEntityName}
            isLoading={isLoading}
            actions={[
                {
                    action: () => accessor && (entity)
                        ? handlePatch()
                        : void 0,
                    icon: Icon.FloppyIcon,
                    disabled: false,
                },
                { action: editorState.delete, icon: Icon.TrashIcon },
            ]}
            tools={
                tools.map(tool => ({
                    ...tool,
                    selected: currentTool?.id === tool.id,
                    onSelect: () => setCurrentTool(tool),
                }))
            }
            {...editorState}
        >
            {currentTool && React.createElement(currentTool.component)}
            <Box direction="row" fullHeight fullWidth>
                {currentTool && !currentTool.isDefault
                    ? (<PuckRender />)
                    : (<EntityRender entity={entity} store={store} />)}
            </Box>
        </Editor>
    );
}
