import React from 'react';
import { t } from 'i18next';
import { useDigitalUser } from '../../../react-digital-user';
import { Button, Box, InputText } from '../../components';
import { Logo } from '../Logo';
import './LoginForm.styles.css';

export default function LoginForm() {
    const [body, setBody] = React.useState({ login: '', password: '' });
    const { login, isLoading } = useDigitalUser();

    return (
        <Box className="DigitalUi-LoginForm" p={3} fullWidth>
            <Logo />
            <form
                id="login"
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                    login({ body });
                }}
            >
                <Box>
                    {['login', 'password'].map(item => (
                        <InputText
                            label={t(`chunks:loginForm.${item}`)}
                            onChange={v => setBody({ ...body, [item]: v })}
                            value={body[item as keyof typeof body]}
                            type={item === 'password' ? 'password' : 'text'}
                            required
                            fullWidth
                        />
                    ))}
                </Box>
                <Box mt={1} justify="end" direction="row">
                    <Button loading={isLoading} type="submit">
                        {t('chunks:loginForm.submit')}
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
