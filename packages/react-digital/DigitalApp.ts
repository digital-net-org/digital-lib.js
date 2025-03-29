import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router, type RouterProps } from './Router';
import { DigitalClientProvider } from '../react-digital-client';
import { AuthInterceptor, AuthRedirect } from '../react-digital-user';
import { ThemeProvider } from './Theme';
import { DigitalIdbProvider, type IDbConfig } from './IdbStorage';
import { LocalizationProvider } from './Localization';

export interface DigitalConfig {
    idbConfig: IDbConfig;
    rootElement?: HTMLElement | null;
    strictMode?: boolean;
    router?: RouterProps['router'];
}

/**
 * Utility class to create a React tree.
 */
export default class DigitalApp {
    /**
     * Creates a new instance of ReactDigital.
     * @param renderLayout - Callback that returns React element wrapping every pages.
     * @param config - Configuration object.
     * @param config.rootElement - The root element to append the react tree.
     * @param config.strictMode - If true, the react tree will be wrapped in a React.StrictMode component.
     * @param config.idbConfig - Indexed database configuration object
     * @param config.axiosConfig - Axios client config
     * @param config.tanstackConfig - Tanstack config
     * @param config.router - Application additional routes
     */
    public static createReactApp(
        renderLayout: RouterProps['renderLayout'],
        { idbConfig, router, strictMode, rootElement }: DigitalConfig
    ) {
        const appRoot = rootElement ?? document.getElementById('root');
        if (appRoot === null) {
            throw new Error('ReactDigital: Root element not found.');
        }

        const middlewares = [AuthInterceptor, AuthRedirect].map(middleware => React.createElement(middleware));

        const providers = (
            [
                { component: LocalizationProvider, props: {} },
                { component: DigitalIdbProvider, props: idbConfig },
                { component: DigitalClientProvider, props: {} },
                { component: ThemeProvider, props: {} },
            ] as Array<{ component: React.FunctionComponent<any>; props: any }>
        ).reduceRight(
            (acc, { component, props }) => React.createElement(component, { children: acc, ...(props ?? {}) }),
            React.createElement(Router, { renderLayout, middlewares, router: router ?? [] })
        );

        return ReactDOM.createRoot(appRoot).render(
            React.createElement(strictMode ? React.StrictMode : React.Fragment, {}, providers)
        );
    }
}
