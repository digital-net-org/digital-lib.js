<p align="center">
    <img width="300" src="/assets/logo-v1_full.svg">
</p>
<div align="center">
    <a href="https://github.com/safari-digital"><img src="https://img.shields.io/badge/safari-digital-green.svg"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Typescript-blue.svg"></a>
</div>

## digital-net/react-digital
This is the main component of the _digital react library_. Mandatory for any "react-digital" plugin.

This library provide an application builder that handles every digital plugins and many low-level utilities and hooks 
for react development.

### Installation
Add the module to your project dependencies and use the `ReactDigitalApp` class to build your application.
Use the `renderReactTree` method to render the application.

#### Example
```tsx
import React from 'react';
import { ReactDigitalApp } from '@digital-net/react-digital';
import { MyApp } from './app';

new ReactDigitalApp({
    router: [],
    renderDocumentName: 'My app',
}).renderReactTree((children: React.ReactNode) => (
    <MyApp>{children}</MyApp>
));
```
#### Options
| key                  | type                          | description                                                                                                                                                                                                            |
|----------------------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `rootElement`        | `HTMLElement \| null`         | The root element to render the application. Default to `#root`.                                                                                                                                                        |
| `strictMode`         | `boolean`                     | Enable React Strict Mode. Default to `true`.                                                                                                                                                                           |
| `router`             | `Array<RouteObject>`          | **React-digital** handles the routing of the application with file-based routing. Any `page.tsx` file under the `src/pages` directory will be automatically added to the router. This option let adds routes manually. |
| `renderDocumentName` | `(current: string) => string` | The name of the document to render. This is used to render the document title.                                                                                                                                         |


