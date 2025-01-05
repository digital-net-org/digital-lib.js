import React from 'react';
import ReactDOM from 'react-dom/client';
import type { ReactDigitalConfig } from './ReactDigitalConfig';
import type { ReactDigitalPlugin } from './ReactDigitalPlugin';
import { type RouteObject, Router, type RouterProps } from './Router';

/**
 * Utility class to create a React tree.
 */
export default class ReactDigitalApp {
    private readonly _strictMode: boolean;
    private readonly _rootElement: HTMLElement | null;
    private readonly _providers: Array<React.ReactNode> = [];
    private readonly _plugins: Array<ReactDigitalPlugin<any>> = [];
    private readonly _router: Array<RouteObject> = [];

    private _buildAppRoot = () => this._strictMode ? React.StrictMode : React.Fragment;

    /**
     * Creates a new instance of ReactDigital.
     * @param config - Configuration object.
     * @param config.rootElement - The root element to append the react tree.
     * @param config.strictMode - If true, the react tree will be wrapped in a React.StrictMode component.
     */
    public constructor(config?: Partial<ReactDigitalConfig>) {
        this._strictMode = config?.strictMode !== undefined ? config?.strictMode : true;
        this._rootElement = config?.rootElement ?? document.getElementById('root');
        this._router = config?.router ?? [];
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

    public addPlugin(...plugin: Array<ReactDigitalPlugin<any>>) {
        this._plugins.push(...plugin);
        return this;
    }

    /**
     * Takes a list of React.Node as parameters. Each element will be appended to the DOM tree as children of the
     * previous one when the renderReactTree method is called.
     * @param elements - A list of React.Node to append to the react DOM tree.
     */
    public addProviders(...elements: Array<React.ReactNode>) {
        this._providers.push(...elements);
        return this;
    }

    private appendProviders(renderLayout: RouterProps['renderLayout']) {
        const middlewares: Array<React.FunctionComponentElement<any>> = [];
        return this._plugins.reduceRight(
            (acc, { Provider, config, Middlewares }) => {
                Middlewares?.forEach(m => middlewares.push(React.createElement(m, config)));
                return React.createElement(Provider, { children: acc, ...config });
            },
            React.createElement(Router, { renderLayout, middlewares, router: this._router }),
            // this.appendProvidersLegacy(),
            // React.createElement(React.Fragment, null),
        );
    }

    private appendProvidersLegacy = (): React.ReactNode =>
        this._providers.reduceRight((acc, element) => element !== undefined
            ? React.cloneElement(
                    element as React.ReactElement<any, string | React.JSXElementConstructor<any>>,
                    { children: acc },
                )
            : null,
        null);
}
