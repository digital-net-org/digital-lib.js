import { type Namespace } from '@digital-lib/react-digital';

export default {
    namespace: 'ui-form',
    fr: {
        validity: {
            required: 'Ce champs est requis',
            pattern: 'Le format est invalide',
        },
    },
    en: {
        validity: {
            required: 'This field is required.',
            pattern: 'This field does not match required pattern',
        },
    },
} satisfies Namespace;
