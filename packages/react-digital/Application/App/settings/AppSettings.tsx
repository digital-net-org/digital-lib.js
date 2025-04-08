import React from 'react';
import { Box, Dialog, InputNav, Text } from '../../../../react-digital-ui';
import { Localization } from '../../../Localization';
import useSettingsState from './useSettingsState';
import './AppSettings.styles.css';

interface AppSettingsProps {
    open: boolean;
    onClose: () => void;
}

export default function AppSettings(props: AppSettingsProps) {
    const { renderView, renderLabel, ...navProps } = useSettingsState();

    return (
        <React.Fragment>
            <Dialog {...props} className="DigitalUi-AppSettings">
                <Dialog.Header>{renderLabel()}</Dialog.Header>
                <Dialog.Panel>
                    <Box justify="space-between" fullHeight>
                        <Box gap={2} fullWidth>
                            <InputNav onRender={renderLabel} {...navProps} />
                        </Box>
                        <Text
                            className="AppVersion"
                            variant="caption"
                            size="xsmall"
                        >{`${Localization.translate('app:settings.version')} ${APP_VERSION}`}</Text>
                    </Box>
                </Dialog.Panel>
                <Dialog.Content>{renderView()}</Dialog.Content>
            </Dialog>
        </React.Fragment>
    );
}
