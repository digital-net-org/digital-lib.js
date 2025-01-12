import React from 'react';
import type { Entity } from '../../../core';
import { useClassName } from '../../../react-digital';
import { BaseTool, Button } from '../../../react-digital-ui';
import type { ToolRenderProps } from './ToolRender';

export default function Selector<T extends Entity>({
    renderEntityName,
    renderToolName,
    actions,
    entity,
    entities,
    selectedEntityId,
    selectEntity,
    isLoading,
}: ToolRenderProps<T>) {
    const className = useClassName({}, 'Selector');

    return (
        <BaseTool
            title={renderToolName('model-selector')}
            actions={actions}
        >
            <div className={className}>
                {(entities ?? []).map(e => (
                    <Button
                        key={e.id}
                        variant="icon"
                        disabled={isLoading}
                        fullWidth
                        selected={e.id === entity?.id}
                        onClick={() => (!isLoading
                            ? selectEntity(e.id !== selectedEntityId ? String(e.id) : undefined)
                            : void 0
                        )}
                    >
                        {renderEntityName(e)}
                    </Button>
                ))}
            </div>
        </BaseTool>
    );
}
