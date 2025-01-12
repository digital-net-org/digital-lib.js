import React, { type PropsWithChildren } from 'react';
import { useClassName } from '../../../react-digital';
import { Box, Text } from '../../../react-digital-ui';
import EditActions, { type EditActionsProps } from './EditActions';

export interface BaseToolProps extends EditActionsProps {
    title?: string;
}

export default function BaseTool({ children, title, actions }: PropsWithChildren<BaseToolProps>) {
    const className = useClassName({}, 'Tool');

    return (
        <Box className={className} fullHeight overflow="hidden">
            <Box direction="row" justify="space-between" align="center" gap={1} fullWidth>
                <Box p={1}>
                    <Text variant="caption">{title ?? ''}</Text>
                </Box>
                <EditActions actions={actions} />
            </Box>
            <Box className={`${className}-render`} p={1} fullWidth fullHeight>
                {children}
            </Box>
        </Box>
    );
}
