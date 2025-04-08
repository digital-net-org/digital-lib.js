import React from 'react';
import { useDigitalQuery } from '@digital-lib/react-digital-client';
import { Box, Form, IconButton, InputText, Text } from '@digital-lib/react-digital-ui';
import { Localization } from '../../../../../../Localization';
import SubmitDialog from './SubmitDialog';

const defaultState = '*********';
const allowedSymboles = '!"#$%&\'()*+-./:;<=>?@[\\]^_{|}~';

export default function PasswordField() {
    const { data: pattern } = useDigitalQuery<string>(`${CORE_API_URL}/validation/pattern/password`);

    const [newPassword, setNewPassword] = React.useState<string | undefined>(defaultState);
    const [confirmPassword, setConfirmPassword] = React.useState<string | undefined>();
    const [isEditing, setIsEditing] = React.useState(false);
    const [isConfirming, setIsConfirming] = React.useState(false);

    const handleSubmit = () => setIsConfirming(true);

    const handleCancel = () => {
        setIsEditing(false);
        setIsConfirming(false);
        setNewPassword(defaultState);
        setConfirmPassword('');
    };

    const handleSetEdit = () => {
        setIsEditing(true);
        setNewPassword('');
    };

    return (
        <React.Fragment>
            <SubmitDialog payload={newPassword} onCancel={handleCancel} open={isConfirming} />
            <Form id="update-password" onSubmit={handleSubmit} gap={1}>
                <Box direction="row" align="end" gap={1} fullWidth>
                    <InputText
                        type="password"
                        value={newPassword}
                        onChange={setNewPassword}
                        label={Localization.translate('app:settings.user.security.password.label')}
                        pattern={pattern}
                        disabled={!isEditing}
                        required
                    />
                    {isEditing ? (
                        <Box direction="row">
                            <IconButton icon="CheckIcon" onClick={handleSubmit} />
                            <IconButton icon="CloseIcon" critical onClick={handleCancel} />
                        </Box>
                    ) : (
                        <IconButton icon="PencilSquare" onClick={handleSetEdit} />
                    )}
                </Box>
                {isEditing && (
                    <React.Fragment>
                        <InputText
                            type="password"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            label={Localization.translate('app:settings.user.security.password.labelConfirm')}
                            pattern={newPassword}
                            disableAdornment
                            required
                        />
                        <Text className="DigitalUi-AppSettings-Password-Tip" variant="span" size="xsmall" italic>
                            {Localization.translate('app:settings.user.security.password.pattern', {
                                symboles: allowedSymboles,
                            })}
                        </Text>
                    </React.Fragment>
                )}
            </Form>
        </React.Fragment>
    );
}
