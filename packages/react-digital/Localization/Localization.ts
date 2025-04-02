import i18next, { t } from 'i18next';

export type SupportedLanguage = (typeof Localization.supportedLanguages)[number];

export default class Localization {
    public static supportedLanguages = ['fr', 'en'] as const;
    public static defaultLanguage = 'en';

    public static translate(string: `${string}:${string}`): string {
        return t(string);
    }

    public static async setLanguage(language: SupportedLanguage) {
        await i18next.changeLanguage(language);
    }

    public static getCurrentLanguage() {
        return i18next.language;
    }
}
