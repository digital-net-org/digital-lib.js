import React from 'react';
import ReactDOM from 'react-dom/client';
import { DigitalClientProvider } from '../react-digital-client';
import { LocalizationMiddleware } from './Localization';
import { DigitalIdbProvider, type IDbConfig } from './IdbStorage';
import { UserProvider, AuthMiddleware } from './User';
import { ThemeProvider } from './Theme';
import { Router, type RouterProps } from './Router';

interface DigitalConfig {
    idbConfig: IDbConfig;
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
     * @param config.idbConfig - Indexed database configuration object
     * @param config.router - Application additional routes
     */
    public static create(renderLayout: RouterProps['renderLayout'], { idbConfig, router }: DigitalConfig) {
        const appRoot = document.getElementById(APP_ROOT);
        if (appRoot === null) {
            throw new Error("ReactDigital: Root element not found. Please add a 'root' id to the root element");
        }

        return ReactDOM.createRoot(appRoot).render(
            <React.StrictMode>
                <LocalizationMiddleware />
                <DigitalIdbProvider {...idbConfig}>
                    <DigitalClientProvider>
                        <UserProvider>
                            <AuthMiddleware />
                            <ThemeProvider>
                                <Router renderLayout={renderLayout} router={router ?? []} />
                            </ThemeProvider>
                        </UserProvider>
                    </DigitalClientProvider>
                </DigitalIdbProvider>
            </React.StrictMode>
        );
    }
}
