import React from 'react';
import { t } from 'i18next';
import { AppLogo } from '../../AppLogo';
import { Button, Box, InputText } from '../../../../react-digital-ui';
import { useUser } from '../../../User';
import './LoginForm.styles.css';

export default function LoginForm() {
    const [body, setBody] = React.useState({ login: '', password: '' });
    const { login, isLoading } = useUser();

    return (
        <Box className="DigitalUi-LoginForm" p={3} fullWidth>
            <AppLogo />
            <form
                id="login"
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                    login({ body });
                }}
            >
                {['login', 'password'].map(item => (
                    <InputText
                        label={t(`login:form.${item}`)}
                        onChange={v => setBody({ ...body, [item]: v })}
                        value={body[item as keyof typeof body]}
                        type={item === 'password' ? 'password' : 'text'}
                        required
                        fullWidth
                    />
                ))}
                <Box mt={1} justify="end" direction="row">
                    <Button loading={isLoading} type="submit">
                        {t('login:form.submit')}
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
