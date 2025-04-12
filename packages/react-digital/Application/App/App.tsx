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

export interface AppProps extends PropsWithChildren {
    renderSettings?: AppSettingsProps['renderSettings'];
}

export default function App({ children, renderSettings }: AppProps) {
    const { current } = useDigitalRouter();
    const { isLogged } = useUser();

    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

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
                            <Actions.User />
                            <ThemeSwitch />
                            <Button variant="icon" onClick={() => setIsSettingsOpen(true)}>
                                <Icon.GearIcon variant="filled" />
                            </Button>
                        </Box>
                    </header>
                    <AppSettings
                        open={isSettingsOpen}
                        onClose={() => setIsSettingsOpen(false)}
                        renderSettings={renderSettings}
                    />
                </React.Fragment>
            )}
            {children}
        </main>
    );
}
