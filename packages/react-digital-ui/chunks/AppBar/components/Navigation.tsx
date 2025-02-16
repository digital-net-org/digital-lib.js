import React from 'react';
import { t } from 'i18next';
import { Box, Icon } from '../../../components';
import ListMenu, { type MenuAction } from './ListMenu';
import { Logo } from '../../Logo';
import './Navigation.styles.css';

export interface NavigationProps {
    navigation: MenuAction[];
}

export default function Navigation({ navigation }: NavigationProps) {
    return (
        <Box className="DigitalUi-AppNavigation" fullWidth>
            <ListMenu
                actions={navigation}
                icon={<Icon.MenuIcon />}
                label={t('chunks:appBar.navigation.label')}
                direction="left"
            />
            <Logo />
        </Box>
    );
}
