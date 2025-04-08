import React from 'react';
import { Box, Text } from '../../../../../react-digital-ui';
import { Localization } from '../../../../Localization';

export default function Panel({ children }: React.PropsWithChildren) {
    return (
        <Box justify="space-between" fullHeight>
            <Box fullWidth>{children}</Box>
            <Text
                className="AppVersion"
                variant="caption"
                size="xsmall"
            >{`${Localization.translate('app:settings.version')} ${APP_VERSION}`}</Text>
        </Box>
    );
}
