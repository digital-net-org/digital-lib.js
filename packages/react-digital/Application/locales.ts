import { type Namespace } from '../Localization';

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
                        labelConfirm: 'Confirmer mot de passe',
                        pattern:
                            'Votre mot de passe doit contenir entre 12 et 128 caractères, avec au moins une majuscule, une minuscule, un chiffre, et un symbole parmi {{symboles}}.',
                        update: 'Saisissez votre mot de passe',
                        success: 'Votre mot de passe a été mis à jour',
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
            label: 'Parameters',
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
                        labelConfirm: 'Confirm password',
                        pattern:
                            'Your password must be between 12 and 128 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one symbol from the following list: {{symboles}}.',
                        update: 'Enter your password',
                        success: 'Your password has been updated',
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
