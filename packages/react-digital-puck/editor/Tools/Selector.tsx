import type { Entity } from '../../../dto';
import { useClassName } from '../../../react-digital';
import { type EditorProps, BaseTool } from '../../../react-digital-ui';
import { type PuckEditorProps } from '../PuckEditor';
import SelectorButton from './SelectorButton';

interface Props<T extends Entity> {
    renderEntityName: PuckEditorProps<T>['renderEntityName'];
    store: PuckEditorProps<T>['store'];
    renderToolName: (id: string) => string;
    actions: EditorProps['actions'];
    entity: T | undefined;
    entities: Array<T>;
    onSelect: (id: T['id']) => void;
    isLoading: boolean;
}

export default function Selector<T extends Entity>({
    renderEntityName,
    renderToolName,
    actions,
    entity,
    entities,
    onSelect,
    isLoading,
    store,
}: Props<T>) {
    const className = useClassName({}, 'Selector');

    return (
        <BaseTool title={renderToolName('model-selector')} actions={actions}>
            <div className={className}>
                {(entities ?? []).map(e => (
                    <SelectorButton
                        entity={e}
                        key={e.id}
                        onSelect={onSelect}
                        selected={e.id === entity?.id}
                        isLoading={isLoading}
                        renderEntityName={renderEntityName}
                        store={store}
                    />
                ))}
            </div>
        </BaseTool>
    );
}
