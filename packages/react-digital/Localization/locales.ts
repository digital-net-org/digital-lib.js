import { type Namespace } from './Namespaces/Namespace';

export default {
    namespace: 'global',
    fr: {
        errors: {
            unhandled: 'Une erreur est survenue',
        },
        actions: {
            validate: 'Valider',
            save: 'Enregistrer',
            cancel: 'Annuler',
            delete: 'Supprimer',
            duplicate: 'Dupliquer',
            auth: {
                login: 'Connexion',
                logout: 'Déconnexion',
            },
        },
    },
    en: {
        errors: {
            unhandled: 'Something went wrong',
        },
        actions: {
            validate: 'Confirm',
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            duplicate: 'Duplicate',
            auth: {
                login: 'Login',
                logout: 'Logout',
            },
        },
    },
} satisfies Namespace;
