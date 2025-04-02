import React from 'react';
import { Localization, type SupportedLanguage } from '@digital-lib/react-digital';

export default function useLocalization() {
    const [currentLanguage, setCurrentLanguage] = React.useState<string>(Localization.getCurrentLanguage());
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const setLanguage = React.useCallback(
        (value: string | undefined) => {
            (async () => {
                if (!value || !Localization.supportedLanguages.find(x => x == value)) {
                    return;
                }
                setIsLoading(true);
                await Localization.setLanguage(value as SupportedLanguage);
                setCurrentLanguage(value);
                setIsLoading(false);
            })();
        },
        [setIsLoading]
    );

    return {
        isLoading,
        currentLanguage,
        setLanguage,
    };
}
