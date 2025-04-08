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
            },
            version: 'version',
        },
    },
} satisfies Namespace;
