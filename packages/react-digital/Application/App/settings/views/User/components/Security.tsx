import { Localization } from '../../../../../../../react-digital';
import { Box, InputText, Text } from '../../../../../../../react-digital-ui';
import { useUser } from '../../../../../../User';

export default function Security() {
    const { email } = useUser();

    return (
        <Box gap={2} fullWidth>
            <Text variant="section-title">{Localization.translate('app:settings.user.security.label')}</Text>
            <InputText
                label={Localization.translate('app:settings.user.security.password.label')}
                onChange={() => void 0}
                value={'********'}
                type="password"
                disabled
            />
            <InputText
                label={Localization.translate('app:settings.user.security.email.label')}
                onChange={() => void 0}
                value={email}
                type="email"
                disabled
            />
        </Box>
    );
}
