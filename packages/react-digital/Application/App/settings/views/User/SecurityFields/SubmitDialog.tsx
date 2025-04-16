import React from 'react';
import { Box, Button, Dialog, Form, InputText } from '@digital-lib/react-digital-ui';
import { useDigitalMutation } from '@digital-lib/react-digital-client';
import { useToaster } from '../../../../../../Toaster';
import { Localization } from '../../../../../../Localization';
import { useUser } from '../../../../../../User';

interface SubmitDialogProps {
    payload: string | undefined;
    onCancel: () => void;
    open: boolean;
}

export default function SubmitDialog({ open, payload, onCancel }: SubmitDialogProps) {
    const { toast } = useToaster();
    const { id } = useUser();
    const [currentPassword, setCurrentPassword] = React.useState<string | undefined>();
    const { mutate, isPending } = useDigitalMutation(`${CORE_API_URL}/user/${id}/password`, {
        method: 'PUT',
        onSuccess: () => {
            onCancel();
            toast('app:settings.user.account.form.security.password.success', 'success');
        },
        onError: () => {
            onCancel();
            toast('user:auth.error', 'error');
        },
        skipRefresh: true,
    });

    const handleSubmit = () => mutate({ body: { currentPassword, newPassword: payload ?? '' } });
    const handleCancel = () => (!isPending ? onCancel() : void 0);

    return (
        <Dialog open={open} onClose={handleCancel}>
            <Dialog.Header>
                {Localization.translate('app:settings.user.account.form.security.password.update')}
            </Dialog.Header>
            <Dialog.Content>
                <Box gap={2} align="end">
                    <Form id="confirm-update-password" onSubmit={handleSubmit}>
                        {open && (
                            <InputText
                                type="password"
                                value={currentPassword}
                                onChange={setCurrentPassword}
                                label={Localization.translate('app:settings.user.account.form.security.password.label')}
                                loading={isPending}
                                required
                                focusOnMount
                            />
                        )}
                    </Form>
                    <Button type="submit" loading={isPending}>
                        {Localization.translate('global:actions.validate')}
                    </Button>
                </Box>
            </Dialog.Content>
        </Dialog>
    );
}
