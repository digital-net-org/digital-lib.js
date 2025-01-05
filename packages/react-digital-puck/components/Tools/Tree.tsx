import React from 'react';
import { Puck } from '@measured/puck';
import { BaseTool } from '../../../react-digital-editor';
import { useClassName } from '../../../react-digital';
import usePuckEditor from '../../context/usePuckEditor';

export default function Tree() {
    const { renderToolName } = usePuckEditor();
    const className = useClassName({}, 'Tree');

    return (
        <BaseTool title={renderToolName('tree')}>
            <div className={className}>
                <Puck.Outline />
            </div>
        </BaseTool>
    );
}
