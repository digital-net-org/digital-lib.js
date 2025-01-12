import type { Entity } from '../../../core';
import type { PuckEditorProps } from '../PuckEditor';
import type { EditorProps } from '../../../react-digital-ui';
import type { Tool } from './tools';
import Selector from './Selector';
import Tree from './Tree';
import Components from './Components';

export interface ToolRenderProps<T extends Entity> extends Omit<PuckEditorProps<T>, 'onCreate' | 'config'> {
    id: Tool['id'] | undefined;
    actions?: EditorProps<T>['actions'];
    entity: T | undefined;
    entities: T[] | undefined;
    selectedEntityId: string | undefined;
    selectEntity: (id: string | undefined) => void;
    isLoading: boolean;
}

export default function ToolRender<T extends Entity>(props: ToolRenderProps<T>) {
    if (props.id === 'model-selector') {
        return <Selector {...props} />;
    }
    if (props.id === 'tree') {
        return <Tree {...props} />;
    }
    if (props.id === 'components') {
        return <Components {...props} />;
    }
    return null;
}
