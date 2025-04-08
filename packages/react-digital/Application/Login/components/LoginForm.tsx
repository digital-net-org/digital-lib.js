import React from 'react';
import { Button, Box, InputText, Form } from '@digital-lib/react-digital-ui';
import { useUser } from '../../../User';
import { Localization } from '../../../Localization';
import { AppLogo } from '../../AppLogo';
import './LoginForm.styles.css';

export default function LoginForm() {
    const [body, setBody] = React.useState({ login: '', password: '' });
    const { login, isLoading } = useUser();

    return (
        <Box className="DigitalUi-LoginForm" p={3} fullWidth>
            <AppLogo />
            <Form id="login" onSubmit={() => login({ body })}>
                {['login', 'password'].map(item => (
                    <React.Fragment key={item}>
                        <InputText
                            label={Localization.translate(`login:form.${item}`)}
                            onChange={v => setBody({ ...body, [item]: v })}
                            value={body[item as keyof typeof body]}
                            type={item === 'password' ? 'password' : 'text'}
                            required
                            fullWidth
                        />
                    </React.Fragment>
                ))}
                <Box mt={1} justify="end" direction="row">
                    <Button loading={isLoading} type="submit">
                        {Localization.translate('login:form.submit')}
                    </Button>
                </Box>
            </Form>
        </Box>
    );
}
