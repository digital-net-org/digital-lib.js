import { type localizationDefaults } from './localizationDefaults';

export type SupportedLanguage = (typeof localizationDefaults.supportedLanguages)[number];
