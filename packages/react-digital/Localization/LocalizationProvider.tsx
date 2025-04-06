import React, { type PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ResourcesBuilder } from './Resources';
import { localizationDefaults } from './config';

export default function LocalizationProvider(props: PropsWithChildren) {
    React.useEffect(() => {
        (async () => {
            await i18next.use(LanguageDetector).init({
                detection: {
                    order: ['navigator', 'localStorage'],
                    caches: ['localStorage'],
                },
                supportedLngs: localizationDefaults.supportedLanguages,
                fallbackLng: localizationDefaults.defaultLanguage,
                resources: ResourcesBuilder.build(),
            });
        })();
    }, []);

    return <I18nextProvider i18n={i18next} {...props} />;
}
