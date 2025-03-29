import { t } from 'i18next';
import type { UserModel } from '../../../dto';
import { useGetById } from '../../../react-digital-client';
import { useDigitalUser } from '../../../react-digital-user';
import { Avatar, Box, ButtonMenu, Icon, type MenuAction } from '../../../react-digital-ui';
import { useDigitalRouter } from '../../Router';
import { ThemeSwitch } from '../../Theme';
import { AppLogo } from '../AppLogo';
import './AppBar.styles.css';

export interface AppBarProps {
    parameters?: MenuAction[];
}

export interface AppBarLayoutProps {
    navigation: MenuAction[];
    parameters: MenuAction[];
    user: UserModel | undefined;
    onLogout: () => void;
    isLoading: boolean;
    location: string;
}

export function AppBarLayout({ location, navigation, parameters, user, onLogout, isLoading }: AppBarLayoutProps) {
    return (
        <header className="DigitalUi-AppBar">
            <Box className="DigitalUi-AppNavigation" fullWidth>
                <ButtonMenu
                    actions={navigation}
                    icon={<Icon.MenuIcon />}
                    label={t('app:navigation.label')}
                    direction="left"
                />
                <AppLogo />
            </Box>
            <Box justify="center" fullWidth>
                {location}
            </Box>
            <Box>
                <ButtonMenu
                    actions={[{ label: t('global:actions.auth.logout'), callback: onLogout }]}
                    icon={<Avatar size="small" />}
                    label={user?.username}
                    loading={isLoading}
                    direction="right"
                />
                <ThemeSwitch />
                <ButtonMenu
                    actions={[...parameters, { label: `${t('app:settings.actions.version')} ${APP_VERSION}` }]}
                    icon={<Icon.GearIcon variant="filled" />}
                    label={t('app:settings.label')}
                    direction="right"
                />
            </Box>
        </header>
    );
}

export default function AppBar({ parameters }: AppBarProps) {
    const { router, current } = useDigitalRouter();
    const appUser = useDigitalUser();
    const { isQuerying, entity } = useGetById<UserModel>(`${CORE_API_URL}/user`, appUser.id);

    return (
        <AppBarLayout
            location={t(`router:page.title.${current?.path}`)}
            navigation={router
                .filter(route => !route.isPublic && route.displayed)
                .sort((a, b) => a.path.localeCompare(b.path))
                .map(r => ({ callback: r.navigate, selected: r.isCurrent, label: t(`router:page.title.${r.path}`) }))}
            user={entity}
            isLoading={isQuerying}
            onLogout={appUser.logout}
            parameters={parameters ?? []}
        />
    );
}
