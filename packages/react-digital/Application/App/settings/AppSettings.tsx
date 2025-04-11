import React from 'react';
import { Dialog } from '../../../../react-digital-ui';
import { Localization } from '../../../Localization';
import { Panel } from './components';
import { UserView, PreferencesView } from './views';
import useSettingsViews from './useSettingsViews';
import './AppSettings.styles.css';

export interface AppSettingsProps {
    open: boolean;
    onClose: () => void;
    renderSettings?: RenderSettingsViews;
}

export type RenderSettingsViews = Record<string, { view: React.ReactNode; label: string }>;

const defaultKey = 'User';

export default function AppSettings(props: AppSettingsProps) {
    const { renderView, value, onSelect, navProps } = useSettingsViews({
        views: {
            User: {
                view: <UserView />,
                label: 'app:settings.label',
            },
            Preferences: {
                view: <PreferencesView />,
                label: 'app:settings.label',
            },
            ...(props?.renderSettings ?? {}),
        },
        defaultKey,
    });

    React.useEffect(() => (!props.open ? onSelect(defaultKey) : void 0), [onSelect, props.open]);

    return (
        <React.Fragment>
            <Dialog {...props} className="DigitalUi-AppSettings">
                <Dialog.Header>{Localization.translate(`app:settings.menu.${value.toLowerCase()}`)}</Dialog.Header>
                <Dialog.Panel>
                    <Panel>
                        {navProps.map(({ label, options }) => (
                            <Panel.Nav
                                value={value}
                                label={Localization.translate(label)}
                                options={options}
                                onSelect={onSelect}
                                onRender={str => Localization.translate(`app:settings.menu.${str.toLowerCase()}`)}
                            />
                        ))}
                    </Panel>
                </Dialog.Panel>
                <Dialog.Content>{renderView()}</Dialog.Content>
            </Dialog>
        </React.Fragment>
    );
}
