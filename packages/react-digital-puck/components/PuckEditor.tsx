import React from 'react';
import { Puck } from '@measured/puck';
import type { Entity } from '../../core';
import { useClassName, useUrlSelect } from '../../react-digital';
import { Box, Icon } from '../../react-digital-ui';
import { Editor } from '../../react-digital-editor';
import { tools } from './Tools';
import usePuckDataResolver from './usePuckDataResolver';
import usePuckEditor from '../context/usePuckEditor';
import './PuckEditor.styles.css';

export default function PuckEditor<T extends Entity>() {
    const [currentTool, setCurrentTool] = useUrlSelect(tools, { store: 'tool', accessor: 'id' });
    const { entity, editEntity, accessor, renderEntityName, ...editorState } = usePuckEditor<T>();
    const className = useClassName({}, 'PuckEditor');

    usePuckDataResolver({ accessor, entity, editEntity });

    return (
        <Editor<T>
            className={className}
            entity={entity}
            renderName={renderEntityName}
            actions={[
                { action: editorState.save, icon: Icon.FloppyIcon, disabled: !editorState.hasChanged },
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
                    ? (
                            <React.Fragment>
                                <Puck.Preview />
                                <Puck.Fields />
                            </React.Fragment>
                        )
                    : (
                            <Box>
                                <h4>View Config</h4>
                                <pre>{JSON.stringify(entity, null, 2)}</pre>
                            </Box>
                        )}
            </Box>
        </Editor>
    );
}
