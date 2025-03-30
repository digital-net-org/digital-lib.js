import React from 'react';
import { t } from 'i18next';
import { Box, Icon, InputNavButton } from '../../../../react-digital-ui';
import { useDigitalRouter } from '../../../Router';
import { AppLogo } from '../../AppLogo';

export default function AppNavigation() {
    const { current, router } = useDigitalRouter();
    const filteredRouter = React.useMemo(
        () => router.filter(route => !route.isPublic && route.displayed).sort((a, b) => a.path.localeCompare(b.path)),
        [router]
    );

    return (
        <Box className="DigitalUi-AppNavigation" fullWidth>
            <InputNavButton
                options={filteredRouter.map(r => r.path)}
                onSelect={value => filteredRouter.find(r => r.path === value)?.navigate()}
                onRender={value => t(`router:page.title.${value}`)}
                value={current?.path}
                icon={<Icon.MenuIcon />}
                direction="left"
            >
                {t('app:navigation.label')}
            </InputNavButton>
            <AppLogo />
        </Box>
    );
}
