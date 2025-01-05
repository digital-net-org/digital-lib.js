import React, { type PropsWithChildren } from 'react';
import i18next, { type Resource } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import type { DigitalLocalizeConfig } from './config/DigitalLocalizeConfig';

export interface LocalesProviderProps {
    fallbackLng: string;
    resource: Resource;
}

export default function LocalesProvider(props: PropsWithChildren<DigitalLocalizeConfig>) {
    React.useEffect(() => {
        (async () => {
            await i18next.init({
                fallbackLng: props.fallbackLng,
                resources: props.resource,
            });
        })();
    }, [props.fallbackLng, props.resource]);

    return <I18nextProvider i18n={i18next} {...props} />;
}
