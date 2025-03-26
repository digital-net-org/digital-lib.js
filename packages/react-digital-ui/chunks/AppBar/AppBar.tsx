import { t } from 'i18next';
import { useDigitalUser } from '../../../react-digital-user';
import { useGetById } from '../../../react-digital-client';
import { useDigitalRouter } from '../../../react-digital';
import type { UserModel } from '../../../dto';
import { Box } from '../../components';
import Navigation, { type NavigationProps } from './components/Navigation';
import Parameters, { type ParametersProps } from './components/Parameters';
import './AppBar.styles.css';

export interface AppBarProps {
    version?: ParametersProps['version'];
}

export function AppBarLayout({
    location,
    navigation,
    ...parameters
}: NavigationProps &
    ParametersProps & {
        location: string;
    }) {
    return (
        <header className="DigitalUi-AppBar">
            <Navigation navigation={navigation} />
            <Box justify="center" fullWidth>
                {location}
            </Box>
            <Parameters {...parameters} />
        </header>
    );
}

export default function AppBar({ version }: AppBarProps) {
    const { router, current } = useDigitalRouter();
    const appUser = useDigitalUser();
    const { isQuerying, entity } = useGetById<UserModel>(`${CORE_API_URL}/user/`, appUser.id);

    return (
        <AppBarLayout
            location={t(`router:page.title.${current?.path}`)}
            navigation={router
                .filter(route => !route.isPublic && route.displayed)
                .sort((a, b) => a.path.localeCompare(b.path))
                .map(r => ({
                    callback: r.navigate,
                    selected: r.isCurrent,
                    label: t(`router:page.title.${r.path}`),
                }))}
            user={entity}
            isLoading={isQuerying}
            onLogout={appUser.logout}
            parameters={[]}
            version={version}
        />
    );
}
