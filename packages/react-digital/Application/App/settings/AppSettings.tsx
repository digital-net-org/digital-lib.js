import React from 'react';
import { Box, Dialog, InputNav, Text } from '../../../../react-digital-ui';
import { useLocalization } from '../../../Localization';
import useSettingsState from './useSettingsState';

interface AppSettingsProps {
    open: boolean;
    onClose: () => void;
}

export default function AppSettings(props: AppSettingsProps) {
    const { translate } = useLocalization();
    const { renderView, renderLabel, ...navProps } = useSettingsState();

    return (
        <React.Fragment>
            <Dialog {...props}>
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
                        >{`${translate('app:settings.version')} ${APP_VERSION}`}</Text>
                    </Box>
                </Dialog.Panel>
                <Dialog.Content>{renderView()}</Dialog.Content>
            </Dialog>
        </React.Fragment>
    );
}
