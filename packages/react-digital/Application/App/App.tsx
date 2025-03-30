import React, { type PropsWithChildren } from 'react';
import { t } from 'i18next';
import { useDigitalUser } from '../../../react-digital-user';
import { Box, Button, Icon } from '../../../react-digital-ui';
import { ThemeSwitch } from '../../Theme';
import { useDigitalRouter } from '../../Router';
import { AppNavigation, AppUser } from './components';
import './fontsources';
import './digital-net.default.css';
import './App.styles.css';

export interface AppProps extends PropsWithChildren {}

export default function App({ children }: AppProps) {
    const { current } = useDigitalRouter();
    const { isLogged } = useDigitalUser();

    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

    return (
        <main className="Page">
            {isLogged && !current?.isPublic && (
                <React.Fragment>
                    <AppNavigation />
                    <Box justify="center" fullWidth>
                        {t(`router:page.title.${current?.path}`)}
                    </Box>
                    <Box>
                        <AppUser />
                        <ThemeSwitch />
                        <Button variant="icon" onClick={() => setIsSettingsOpen(true)}>
                            <Icon.GearIcon variant="filled" />
                        </Button>
                    </Box>
                </React.Fragment>
            )}
            {children}
        </main>
    );
}
