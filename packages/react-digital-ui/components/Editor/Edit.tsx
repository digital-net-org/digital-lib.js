import React, { type PropsWithChildren } from 'react';
import type { Entity } from '../../../core';
import { Box } from '../../../react-digital-ui';
import { useClassName } from '../../../react-digital';
import EditActions, { type EditActionsProps } from './EditActions';

export interface EditProps extends EditActionsProps {
    renderName?: () => React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
    isModified?: boolean;
}

export default function Edit({
    children,
    actions,
    renderName,
    isModified,
    ...state
}: PropsWithChildren<EditProps>) {
    const className = useClassName({}, 'Edit');

    return (
        <Box className={className}>
            <Box className={`${className}-State`}>
                <Box />
                <Box>
                    {renderName ? renderName() : null}
                </Box>
                <EditActions actions={actions} {...state} />
            </Box>
            <Box direction="row" overflow="hidden" fullHeight fullWidth>
                {children}
            </Box>
        </Box>
    );
}
