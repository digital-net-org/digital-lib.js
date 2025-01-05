<p align="center">
    <img width="300" src="/assets/logo-v1_full.svg">
</p>
<div align="center">
    <a href="https://github.com/safari-digital"><img src="https://img.shields.io/badge/safari-digital-green.svg"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Typescript-blue.svg"></a>
</div>

## digital-net/react-digital-client
Collection of hooks and utilities to handle data fetching and state management. This library should only be used with the **[Digital.Net](https://github.com/Safari-digital/Digital.Net)** library.

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
    .addPlugin(new ReactDigitalClientPlugin({
        axiosConfig: {
            baseURL: DIGITAL_API_URL,
        },
    }))
    .renderReactTree((children: React.ReactNode) => (
    <MyApp>{children}</MyApp>
));
```
#### Options
| key              | type                  | description                                                                         |
|------------------|-----------------------|-------------------------------------------------------------------------------------|
| `axiosConfig`    | `CreateAxiosDefaults` | Axios configuration object. See Axios documentation for further informations.       |
| `tanstackConfig` | `TanstackConfig`      | Tanstack configuration object. See Tanstack documentation for further informations. |

