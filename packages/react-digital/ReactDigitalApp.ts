import React from 'react';
import ReactDOM from 'react-dom/client';

export interface ReactDigitalConfig {
    rootElement?: HTMLElement | null;
    strictMode?: boolean;
}

/**
 * Utility class to create a React tree.
 */
export default class ReactDigitalApp {
    private readonly _strictMode: boolean;
    private readonly _rootElement: HTMLElement | null;
    private readonly _providers: Array<React.ReactNode> = [];

    /**
     * Creates a new instance of ReactDigital.
     * @param config - Configuration object.
     * @param config.rootElement - The root element to append the react tree.
     * @param config.strictMode - If true, the react tree will be wrapped in a React.StrictMode component.
     */
    public constructor(config?: ReactDigitalConfig) {
        this._strictMode = config?.strictMode !== undefined ? config?.strictMode : true;
        this._rootElement = config?.rootElement ?? document.getElementById('root');
    }

    /**
     * Renders the react tree.
     */
    public renderReactTree() {
        if (this._rootElement === null) {
            throw new Error('ReactDigital: Root element not found.');
        }
        const root = this._strictMode ? React.StrictMode : React.Fragment;
        return ReactDOM
            .createRoot(this._rootElement)
            .render(React.createElement(root, {}, this.appendProviders()));
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

    private appendProviders = (): React.ReactNode =>
        this._providers.reduceRight((acc, element) => element !== undefined
            ? React.cloneElement(
                    element as React.ReactElement<any, string | React.JSXElementConstructor<any>>,
                    { children: acc },
                )
            : null,
        null);
}
