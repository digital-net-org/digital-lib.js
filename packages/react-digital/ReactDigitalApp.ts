import React from 'react';
import ReactDOM from 'react-dom/client';
import type { ReactDigitalConfig } from './ReactDigitalConfig';
import type { ReactDigitalPlugin } from './ReactDigitalPlugin';
import { type RouteObject, Router, type RouterProps } from './Router';
import { DigitalClientPlugin } from '../react-digital-client';
import { DigitalIdbPlugin } from '../react-digital-idb';
import { DigitalUserPlugin } from '../react-digital-user';
import { DigitalLocalizePlugin } from '../react-digital-localize';
import { DigitalUiPlugin } from '../react-digital-ui';

/**
 * Utility class to create a React tree.
 */
export default class ReactDigitalApp {
    private readonly _strictMode: boolean;
    private readonly _rootElement: HTMLElement | null;
    private readonly _router: Array<RouteObject> = [];
    private readonly _plugins: Array<ReactDigitalPlugin<any>> = [];

    private _buildAppRoot = () => this._strictMode ? React.StrictMode : React.Fragment;

    /**
     * Creates a new instance of ReactDigital.
     * @param config - Configuration object.
     * @param config.rootElement - The root element to append the react tree.
     * @param config.strictMode - If true, the react tree will be wrapped in a React.StrictMode component.
     */
    public constructor(config: ReactDigitalConfig) {
        this._strictMode = config?.strictMode !== undefined ? config?.strictMode : true;
        this._rootElement = config?.rootElement ?? document.getElementById('root');
        this._router = config?.router ?? [];
        this._plugins.push(...[
            new DigitalIdbPlugin(config.idbConfig),
            new DigitalUserPlugin(config),
            new DigitalClientPlugin(config),
            new DigitalLocalizePlugin(config.i18nConfig),
            new DigitalUiPlugin(),
        ]);
    }

    /**
     * Renders the react tree.
     * @param renderLayout - A function that receives the children of the Router component and returns a React.Node.
     * Use this function to wrap the Router component with a layout component.
     * @returns The react tree.
     */
    public renderReactTree(renderLayout: RouterProps['renderLayout']) {
        if (this._rootElement === null) {
            throw new Error('ReactDigital: Root element not found.');
        }

        return ReactDOM
            .createRoot(this._rootElement)
            .render(React.createElement(
                this._buildAppRoot(),
                {},
                this.appendProviders(renderLayout),
            ));
    }

    private appendProviders(renderLayout: RouterProps['renderLayout']) {
        const middlewares: Array<React.FunctionComponentElement<any>> = [];
        return this._plugins.reduceRight(
            (acc, { Provider, config, Middlewares }) => {
                Middlewares?.forEach(m => middlewares.push(React.createElement(m, config)));
                return React.createElement(Provider, { children: acc, ...config });
            },
            React.createElement(Router, { renderLayout, middlewares, router: this._router }),
        );
    }
}
