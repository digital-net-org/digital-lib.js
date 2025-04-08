import { type Namespace } from '../../react-digital';

export default {
    namespace: 'app',
    fr: {
        navigation: {
            label: 'Navigation',
        },
        settings: {
            label: 'Paramètres',
            menu: {
                user: 'Mon compte',
                preferences: 'Préférences',
            },
            options: {
                language: {
                    label: 'Langage',
                    inputs: {
                        fr: 'Français',
                        en: 'Anglais',
                    },
                },
            },
            user: {
                username: {
                    label: "Nom d'utilisateur",
                },
                security: {
                    label: 'Sécurité',
                    password: {
                        label: 'Mot de passe',
                    },
                    email: {
                        label: 'E-mail',
                    },
                },
            },
            version: 'version',
        },
    },
    en: {
        navigation: {
            label: 'Navigation',
        },
        settings: {
            label: 'Paramètres',
            menu: {
                user: 'My account',
                preferences: 'Preferences',
            },
            options: {
                language: {
                    label: 'Language',
                    inputs: {
                        fr: 'French',
                        en: 'English',
                    },
                },
            },
            user: {
                username: {
                    label: 'Username',
                },
                security: {
                    label: 'Security',
                    password: {
                        label: 'Password',
                    },
                    email: {
                        label: 'E-mail',
                    },
                },
            },
            version: 'version',
        },
    },
} satisfies Namespace;
