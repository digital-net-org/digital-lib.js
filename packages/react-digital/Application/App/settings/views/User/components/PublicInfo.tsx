import { Avatar, Box, InputText } from '@digital-lib/react-digital-ui';
import { Localization } from '../../../../../../Localization';
import { useUser } from '../../../../../../User';

export function PublicInfo() {
    const { username } = useUser();
    return (
        <Box direction="row" gap={2}>
            <Avatar size="large" />
            <InputText
                onChange={() => void 0}
                label={Localization.translate('app:settings.user.account.form.username.label')}
                value={username}
                disabled
            />
        </Box>
    );
}
