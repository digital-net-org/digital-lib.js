import React from 'react';
import { Button, Icon } from '../../../react-digital-ui';
import { BaseTool } from '../../../react-digital-editor';
import { useClassName } from '../../../react-digital';
import usePuckEditor from '../../context/usePuckEditor';

export default function Selector() {
    const { entities, entity, setEntity, create, renderEntityName, renderToolName, ...state } = usePuckEditor();
    const className = useClassName({}, 'Selector');

    return (
        <BaseTool
            title={renderToolName('model-selector')}
            actions={[{ action: create, icon: Icon.AddIcon, ...state }]}
        >
            <div className={className}>
                {entities.map(e => (
                    <Button
                        key={e.id}
                        variant="icon"
                        disabled={state.isLoading}
                        fullWidth
                        selected={e.id === entity?.id}
                        onClick={() => (!state.isLoading ? setEntity(String(e.id)) : void 0)}
                    >
                        {renderEntityName(e)}
                    </Button>
                ))}
            </div>
        </BaseTool>
    );
}
