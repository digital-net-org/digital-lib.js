<p align="center">
    <img width="300" src="/assets/logo-v1_full.svg">
</p>
<div align="center">
    <a href="https://github.com/safari-digital"><img src="https://img.shields.io/badge/safari-digital-green.svg"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Typescript-blue.svg"></a>
</div>

## digital-net/react-digital-localize
Localization tools for React using [i18Next](https://www.i18next.com). 
Uses file system to find namespaces and translations.

### Installation
Add the module to your project dependencies and use the `ReactDigitalApp` class and use the `addPlugin` method to 
setup the plugin.

#### Example
```tsx
import React from 'react';
import { ReactDigitalApp } from '@digital-net/react-digital';
import { MyApp } from './app';

new ReactDigitalApp({
    router: [],
    renderDocumentName: 'My app',
})
    .addPlugin(new DigitalLocalizePlugin())
    .renderReactTree((children: React.ReactNode) => (
    <MyApp>{children}</MyApp>
));
```
#### Options
| key           | type       | description                                                                                                                                                               |
|---------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fallbackLng` | `string`   | Default language to use if the translation is not found (default to 'fr')                                                                                                 |
| `resource`    | `Resource` | Resource object to use for the translation. This should not be needed as the plugin will automatically load the translations from every `locales.ts` files under `src/*`. |

