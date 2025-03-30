import { t } from 'i18next';
import type { UserModel } from '../../../../dto';
import { Avatar, Box, Button, ButtonMenu, Icon, InputNavButton } from '../../../../react-digital-ui';
import { useDigitalRouter } from '../../../../react-digital';
import { ThemeSwitch } from '../../../Theme';
import AppNavigation from './AppNavigation';
import AppUser from './AppUser';

export interface AppBarProps {
    user: UserModel | undefined;
    isLoading: boolean;
    onLogout: () => void;
    onSettings: () => void;
}

export default function AppBar({ user, onLogout, onSettings, isLoading }: AppBarProps) {
    const { current } = useDigitalRouter();

    return (
        <header className="DigitalUi-AppBar">
            <AppNavigation />
            <Box justify="center" fullWidth>
                {t(`router:page.title.${current?.path}`)}
            </Box>
            <Box>
                <AppUser />
                <ThemeSwitch />
                <Button variant="icon" onClick={onSettings}>
                    <Icon.GearIcon variant="filled" />
                </Button>
            </Box>
        </header>
    );
}
