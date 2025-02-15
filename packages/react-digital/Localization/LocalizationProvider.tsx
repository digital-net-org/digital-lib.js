import React, { type PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import ResourcesBuilder from './ResourcesBuilder';

export default function LocalizationProvider(props: PropsWithChildren) {
    React.useEffect(() => {
        (async () => {
            await i18next.init({
                fallbackLng: 'en',
                resources: ResourcesBuilder.build(),
            });
        })();
    }, []);

    return <I18nextProvider i18n={i18next} {...props} />;
}
