import React, { type PropsWithChildren } from 'react';
import { useClassName } from '../../../core';
import { Localization } from '../../../react-digital';
import { Box, Text } from '../../../react-digital-ui';
import EditActions, { type EditActionsProps } from './EditActions';
import './Edit.styles.css';

export interface EditProps extends EditActionsProps {
    renderName?: () => React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
    isModified?: boolean;
}

export default function Edit({ children, actions, renderName, isModified, ...state }: PropsWithChildren<EditProps>) {
    const className = useClassName({}, 'Edit');

    return (
        <Box className={className}>
            <Box className={`${className}-State`}>
                <Box />
                <Box direction="row" align="center" gap={1}>
                    <Text variant="span">{renderName ? renderName() : null}</Text>
                    <Text variant="span" size="small" italic>
                        {isModified ? Localization.translate('puck:state:modified') : ''}
                    </Text>
                </Box>
                <EditActions actions={actions} {...state} />
            </Box>
            <Box direction="row" overflow="hidden" fullHeight fullWidth>
                {children}
            </Box>
        </Box>
    );
}
