<p align="center">
    <img width="300" src="/assets/logo-v1_full.svg">
</p>
<div align="center">
    <a href="https://github.com/safari-digital"><img src="https://img.shields.io/badge/safari-digital-green.svg"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Typescript-blue.svg"></a>
</div>

## digital-net/react-digital-user
Handles user authentication and authorization. Require ***react-digital-client***.

It covers redirection on login/logout, token refresh, and user authentication. 
It also provides a `useDigitalUser` hook to access the user data/actions.

### Installation
Add the module to your project dependencies and use the `ReactDigitalApp` class and use the `addPlugin` method to 
setup the plugin.

#### Example
```tsx
import React from 'react';
import { ReactDigitalApp } from '@digital-net/react-digital';
import { MyApp } from './app';

new ReactDigitalApp({
    router: [],
    renderDocumentName: 'My app',
})
    .addPlugin(new DigitalUserPlugin({
        routerOptions: {
            publicRoutes: [APP_PATH_LOGIN],
            loginRedirect: APP_PATH_HOME,
            logoutRedirect: APP_PATH_LOGIN,
        },
        userApi: {
            refreshToken: '/authentication/user/refresh',
            logout: '/authentication/user/logout',
            login: '/authentication/user/login',
        },
    }))
    .renderReactTree((children: React.ReactNode) => (
    <MyApp>{children}</MyApp>
));
```
#### Options
_Every options have a fallback value (for simplicity), but they won't work as it's highly dependent on the backend API._

| key             | type            | description                                                |
|-----------------|-----------------|------------------------------------------------------------|
| `routerOptions` | `RouterOptions` | Set the publicly accessible routes and the redirect paths. |
| `userApi`       | `UserApi`       | Set the API endpoints for the user authentication.         |

### Usage
See the following code to handle login form.
```tsx
import React from 'react';
import { useDigitalUser } from '@digital-net/react-digital-user';
import { Box, Form, useForm } from '@digital-net/react-digital-ui';
import { loginForm } from './form';

export default function LoginPage() {
    const { login, isLoading } = useDigitalUser();
    const { formBody: body, renderFields } = useForm(loginForm);
    const handleSubmit = () => login({ body });

    return (
        <Box>
            <Box>
                <Logo />
                <Form 
                    onSubmit={handleSubmit} 
                    loading={isLoading} 
                    actionLabel={t('login:form.submit')}
                >
                    {renderFields()}
                </Form>
            </Box>
        </Box>
    );
}
```