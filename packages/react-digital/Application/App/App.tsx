import React, { type PropsWithChildren } from 'react';
import { Box, Button, Icon } from '@digital-lib/react-digital-ui';
import { Localization } from '../../Localization';
import { useUser } from '../../User';
import { ThemeSwitch } from '../../Theme';
import { useDigitalRouter } from '../../Router';
import { Actions } from './actions';
import { AppSettings, type AppSettingsProps } from './settings';
import './fontsources';
import './App.styles.css';
import './AppBar.styles.css';
import { defaultViews } from './settings/views';
import { useDigitalApp } from '@digital-lib/react-digital';

export interface AppProps extends PropsWithChildren {
    settingsViews?: {
        views: AppSettingsProps['views'];
        onLabelRender: AppSettingsProps['onLabelRender'];
    };
    settingsActions?: Array<React.ReactNode>;
}

export function App({ children, settingsViews, settingsActions }: AppProps) {
    const { current } = useDigitalRouter();
    const { isLogged } = useUser();
    const { openAppSettings } = useDigitalApp();

    return (
        <main className="Page">
            {isLogged && !current?.isPublic && (
                <React.Fragment>
                    <header className="DigitalUi-AppBar">
                        <Actions.Navigation />
                        <Box justify="center" fullWidth>
                            {Localization.translate(`router:page.title.${current?.path}`)}
                        </Box>
                        <Box>
                            {settingsActions?.map(action => action)}
                            <Actions.User />
                            <ThemeSwitch />
                            <Button variant="icon" onClick={() => openAppSettings(Object.keys(defaultViews)[0])}>
                                <Icon.GearIcon variant="filled" />
                            </Button>
                        </Box>
                    </header>
                    <AppSettings {...settingsViews} />
                </React.Fragment>
            )}
            {children}
        </main>
    );
}
