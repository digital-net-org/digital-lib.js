import React from 'react';
import { Puck } from '@measured/puck';
import { BaseTool } from '../../../react-digital-editor';
import { useClassName } from '../../../react-digital';
import usePuckEditor from '../../context/usePuckEditor';

export default function Components() {
    const { renderToolName } = usePuckEditor();
    const className = useClassName({}, 'Components');

    return (
        <BaseTool title={renderToolName('components')}>
            <div className={className}>
                <Puck.Components />
            </div>
        </BaseTool>
    );
}
