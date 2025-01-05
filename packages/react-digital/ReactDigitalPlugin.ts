import type React from 'react';

export interface ReactDigitalPlugin<T> {
    config: T;
    Provider: React.FunctionComponent<T>;
    Middlewares: React.FunctionComponent<T>[];
}
