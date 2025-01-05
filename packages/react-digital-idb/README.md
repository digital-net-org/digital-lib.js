<p align="center">
    <img width="300" src="/assets/logo-v1_full.svg">
</p>
<div align="center">
    <a href="https://github.com/safari-digital"><img src="https://img.shields.io/badge/safari-digital-green.svg"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Typescript-blue.svg"></a>
</div>

## digital-net/react-digital-idb
IndexedDB wrapper for React. Used to store payloads locally in the browser for offline use.

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
    .addPlugin(new DigitalIdbPlugin({
        stores: ['entity_name'],
        name: 'db_name',
        version: 1,
    }))
    .renderReactTree((children: React.ReactNode) => (
    <MyApp>{children}</MyApp>
));
```
#### Options
| key       | type       | description                                                                            |
|-----------|------------|----------------------------------------------------------------------------------------|
| `stores`  | `string[]` | List of store names to create. A _**store**_ can be seen as a table in a SQL database. |
| `name`    | `string`   | Name of the database.                                                                  |
| `version` | `number`   | Version of the database.                                                               |

