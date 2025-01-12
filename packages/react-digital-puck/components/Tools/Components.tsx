import React from 'react';
import { Puck } from '@measured/puck';
import { BaseTool } from '../../../react-digital-ui';
import { useClassName } from '../../../react-digital';
import type { Entity } from '../../../core';
import type { ToolRenderProps } from './ToolRender';

export default function Components<T extends Entity>({ renderToolName }: ToolRenderProps<T>) {
    const className = useClassName({}, 'Components');

    return (
        <BaseTool title={renderToolName('components')}>
            <div className={className}>
                <Puck.Components />
            </div>
        </BaseTool>
    );
}
