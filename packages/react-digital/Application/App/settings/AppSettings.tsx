import React from 'react';
import { Dialog } from '../../../../react-digital-ui';
import { Localization } from '../../../Localization';
import { Panel } from './components';
import { UserView, PreferencesView } from './views';
import useSettingsViews from './useSettingsViews';
import './AppSettings.styles.css';

interface AppSettingsProps {
    open: boolean;
    onClose: () => void;
}

export default function AppSettings(props: AppSettingsProps) {
    const { renderView, ...navProps } = useSettingsViews({
        views: {
            Preferences: <PreferencesView />,
            User: <UserView />,
        },
        defaultKey: 'Preferences',
    });

    return (
        <React.Fragment>
            <Dialog {...props} className="DigitalUi-AppSettings">
                <Dialog.Header>
                    {Localization.translate(`app:settings.menu.${navProps.value.toLowerCase()}`)}
                </Dialog.Header>
                <Dialog.Panel>
                    <Panel>
                        <Panel.Nav
                            label={'Paramètres'}
                            onRender={str => Localization.translate(`app:settings.menu.${str.toLowerCase()}`)}
                            {...navProps}
                        />
                    </Panel>
                </Dialog.Panel>
                <Dialog.Content>{renderView()}</Dialog.Content>
            </Dialog>
        </React.Fragment>
    );
}
