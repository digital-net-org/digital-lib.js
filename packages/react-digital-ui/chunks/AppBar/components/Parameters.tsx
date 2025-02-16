import { t } from 'i18next';
import { ThemeSwitch } from '../../../theme';
import type { UserModel } from '../../../../dto';
import { Avatar, Box, Icon } from '../../../components';
import ListMenu, { MenuAction } from './ListMenu';

export interface ParametersProps {
    parameters: MenuAction[];
    user: UserModel | undefined;
    onLogout: () => void;
    isLoading: boolean;
    version?: string;
}

export default function Parameters({ parameters, user, onLogout, isLoading, version }: ParametersProps) {
    return (
        <Box>
            <ListMenu
                actions={[{ label: t('global:actions.auth.logout'), callback: onLogout }]}
                icon={<Avatar size="small" />}
                label={user?.username}
                loading={isLoading}
                direction="right"
            />
            <ThemeSwitch />
            <ListMenu
                actions={[...parameters, { label: version ?? '0.0.0' }]}
                icon={<Icon.GearIcon variant="filled" />}
                direction="right"
            />
        </Box>
    );
}
