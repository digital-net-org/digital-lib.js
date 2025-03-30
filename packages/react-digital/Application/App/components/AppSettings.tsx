import React from 'react';
import { t } from 'i18next';
import { Box, Dialog } from '../../../../react-digital-ui';

export default function AppSettings() {
    return (
        <React.Fragment>
            <Dialog open={false} onClose={() => void 0}>
                <Box>{`${t('app:settings.actions.version')} ${APP_VERSION}`}</Box>
            </Dialog>
        </React.Fragment>
    );
}
