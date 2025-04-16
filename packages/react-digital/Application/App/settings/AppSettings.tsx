import React from 'react';
import { Dialog } from '@digital-lib/react-digital-ui';
import { Localization } from '../../../Localization';
import { Panel } from './components';
import './AppSettings.styles.css';
import { PreferencesView, UserView } from './views';

export interface AppSettingsProps {
    open: boolean;
    onClose: () => void;
    views?: Record<string, React.ReactNode>;
    onLabelRender?: (key: string) => string;
}

const defaultViews = {
    account: <UserView />,
    preferences: <PreferencesView />,
};

const defaultValue = Object.keys(defaultViews)[0];

export default function AppSettings({ onLabelRender, views, ...props }: AppSettingsProps) {
    const options = React.useMemo(
        () => ({
            ...defaultViews,
            ...(views ?? {}),
        }),
        [views]
    );

    const [selected, setSelected] = React.useState<string>(defaultValue);
    const isDefault = React.useMemo(() => Object.keys(defaultViews).includes(selected), [selected]);

    React.useEffect(() => (!props.open ? setSelected(defaultValue) : void 0), [props.open]);

    return (
        <React.Fragment>
            <Dialog {...props} className="DigitalUi-AppSettings">
                <Dialog.Header>
                    {isDefault
                        ? Localization.translate(`app:settings.user.${selected}.label`)
                        : onLabelRender?.(selected)}
                </Dialog.Header>
                <Dialog.Panel>
                    <Panel>
                        <Panel.Nav
                            value={selected}
                            options={Object.keys(defaultViews)}
                            onSelect={setSelected}
                            label={Localization.translate('app:settings.user.label')}
                            onRender={str => Localization.translate(`app:settings.user.${str}.label`)}
                        />
                        {views !== undefined && (
                            <Panel.Nav
                                value={selected}
                                options={Object.keys(views)}
                                onSelect={setSelected}
                                label={Localization.translate('app:settings.application.label')}
                                onRender={str => onLabelRender?.(str)}
                            />
                        )}
                    </Panel>
                </Dialog.Panel>
                <Dialog.Content>{options[selected]}</Dialog.Content>
            </Dialog>
        </React.Fragment>
    );
}
