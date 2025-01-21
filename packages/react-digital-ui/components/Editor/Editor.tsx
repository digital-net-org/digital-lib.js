import type { Entity } from '../../../core';
import { useClassName } from '../../../react-digital';
import { Box } from '../../../react-digital-ui';
import Edit, { type EditProps } from './Edit';
import ToolBar, { type ToolBarProps } from './ToolBar';
import './Editor.styles.css';
import type { PropsWithChildren } from 'react';

export interface EditorProps<T extends Entity> extends EditProps<T>, ToolBarProps {
    className?: string;
    modifiedStates: Record<string, boolean>;
}

export default function Editor<T extends Entity>({
    className,
    children,
    actions,
    entity,
    tools,
    renderName,
    modifiedStates,
    ...state
}: PropsWithChildren<EditorProps<T>>) {
    const resolvedClassname = useClassName({ className }, 'Editor');

    return (
        <Box className={resolvedClassname}>
            <ToolBar
                tools={tools}
                {...state}
            />
            <Edit<T>
                renderName={renderName}
                entity={entity}
                actions={actions}
                isLoading={false}
                isModified={entity ? modifiedStates[entity.id] : false}
                disabled={false}
                {...state}
            >
                {children}
            </Edit>
        </Box>
    );
}
