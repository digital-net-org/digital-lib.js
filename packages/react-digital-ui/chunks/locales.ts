import { type Namespace } from '../../react-digital';

export default {
    namespace: 'chunks',
    fr: {
        appBar: {
            navigation: {
                label: 'Navigation',
            },
            configuration: {
                actions: {
                    version: "Version de l'application:",
                },
            },
        },
        loginForm: {
            login: 'Identifiant',
            password: 'Mot de passe',
            submit: 'Connexion',
        },
    },
    en: {
        appBar: {
            navigation: {
                label: 'Navigation',
            },
            configuration: {
                actions: {
                    version: 'Application version:',
                },
            },
        },
        loginForm: {
            login: 'Login',
            password: 'Password',
            submit: 'Login',
        },
    },
} satisfies Namespace;
