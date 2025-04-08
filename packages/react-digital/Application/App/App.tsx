import React, { type PropsWithChildren } from 'react';
import { Box, Button, Icon } from '../../../react-digital-ui';
import { Localization } from '../../Localization';
import { useUser } from '../../User';
import { ThemeSwitch } from '../../Theme';
import { useDigitalRouter } from '../../Router';
import { Actions } from './actions';
import { AppSettings } from './settings';
import './fontsources';
import './digital-net.default.css';
import './App.styles.css';

export interface AppProps extends PropsWithChildren {}

export default function App({ children }: AppProps) {
    const { current } = useDigitalRouter();
    const { isLogged } = useUser();

    const [isSettingsOpen, setIsSettingsOpen] = React.useState(true);

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
                    <AppSettings open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
                </React.Fragment>
            )}
            {children}
        </main>
    );
}
