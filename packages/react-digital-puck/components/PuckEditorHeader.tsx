import { Box, Text } from '../../react-digital-ui';
import { t } from 'i18next';
import React from 'react';

interface PuckEditorHeaderProps {
    name: string;
    isCurrentMutated: boolean;
}

export default function PuckEditorHeader({
    name,
    isCurrentMutated,
}: PuckEditorHeaderProps) {
    return (
        <Box direction="row" align="center" gap={1}>
            <Text variant="span">
                {name}
            </Text>
            <Text variant="span" size="small" italic>
                {isCurrentMutated ? t('puck:state:modified') : ''}
            </Text>
        </Box>
    );
}
