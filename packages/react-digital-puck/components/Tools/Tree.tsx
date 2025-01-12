import React from 'react';
import { Puck } from '@measured/puck';
import { type Entity } from '../../../core';
import { useClassName } from '../../../react-digital';
import { BaseTool } from '../../../react-digital-ui';
import type { ToolRenderProps } from './ToolRender';

export default function Tree<T extends Entity>({ renderToolName }: ToolRenderProps<T>) {
    const className = useClassName({}, 'Tree');

    return (
        <BaseTool title={renderToolName('tree')}>
            <div className={className}>
                <Puck.Outline />
            </div>
        </BaseTool>
    );
}
