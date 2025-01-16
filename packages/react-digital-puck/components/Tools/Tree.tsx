import React from 'react';
import { Puck } from '@measured/puck';
import { useClassName } from '../../../react-digital';
import { BaseTool } from '../../../react-digital-ui';
import { type PuckEditorProps } from '../PuckEditor';

interface Props {
    renderToolName: PuckEditorProps<any>['renderToolName'];
}

export default function Tree({ renderToolName }: Props) {
    const className = useClassName({}, 'Tree');

    return (
        <BaseTool title={renderToolName('tree')}>
            <div className={className}>
                <Puck.Outline />
            </div>
        </BaseTool>
    );
}
