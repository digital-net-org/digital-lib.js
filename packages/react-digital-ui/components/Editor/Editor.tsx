import { useClassName } from '../../../react-digital';
import { Box } from '../../../react-digital-ui';
import Edit, { type EditProps } from './Edit';
import ToolBar, { type ToolBarProps } from './ToolBar';
import './Editor.styles.css';
import type { PropsWithChildren } from 'react';

export interface EditorProps extends EditProps, ToolBarProps {
    className?: string;
}

export default function Editor({
    className,
    children,
    actions,
    tools,
    renderName,
    ...state
}: PropsWithChildren<EditorProps>) {
    const resolvedClassname = useClassName({ className }, 'Editor');

    return (
        <Box className={resolvedClassname}>
            <ToolBar
                tools={tools}
                {...state}
            />
            <Edit
                renderName={renderName}
                actions={actions}
                isLoading={false}
                disabled={false}
                {...state}
            >
                {children}
            </Edit>
        </Box>
    );
}
