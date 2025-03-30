import React from 'react';
import { t } from 'i18next';
import { Box, PopUp } from '@digital-lib/react-digital-ui';

export default function AppSettings() {
    return (
        <React.Fragment>
            <PopUp open={false} onClose={() => void 0}>
                <Box>{`${t('app:settings.actions.version')} ${APP_VERSION}`}</Box>
            </PopUp>
        </React.Fragment>
    );
}
