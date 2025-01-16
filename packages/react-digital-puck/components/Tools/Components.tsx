import React from 'react';
import { Puck } from '@measured/puck';
import { BaseTool } from '../../../react-digital-ui';
import { useClassName } from '../../../react-digital';
import { type PuckEditorProps } from '../PuckEditor';

interface Props {
    renderToolName: PuckEditorProps<any>['renderToolName'];
}

export default function Components({ renderToolName }: Props) {
    const className = useClassName({}, 'Components');

    return (
        <BaseTool title={renderToolName('components')}>
            <div className={className}>
                <Puck.Components />
            </div>
        </BaseTool>
    );
}
