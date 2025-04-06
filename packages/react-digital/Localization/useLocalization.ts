import React from 'react';
import { localizationDefaults, type SupportedLanguage } from './config';
import { useTranslation } from 'react-i18next';

export default function useLocalization() {
    const { i18n, t } = useTranslation();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const setLanguage = React.useCallback(
        (value: SupportedLanguage | undefined) => {
            (async () => {
                if (!value || !localizationDefaults.supportedLanguages.find(x => x == value)) {
                    return;
                }
                setIsLoading(true);
                await i18n.changeLanguage(value);
                setIsLoading(false);
            })();
        },
        [i18n]
    );

    return {
        currentLanguage: i18n.language as SupportedLanguage,
        setLanguage,
        translate: t,
        isLoading,
    };
}
