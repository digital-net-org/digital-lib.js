<p align="center">
    <img width="300" src="/assets/logo-v1_full.svg">
</p>
<div align="center">
    <a href="https://github.com/safari-digital"><img src="https://img.shields.io/badge/safari-digital-green.svg"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Typescript-blue.svg"></a>
</div>

## digital-net/react-digital-puck
**Measured/Puck** wrapper. See https://puckeditor.com for more information.

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
})
    .addPlugin(new DigitalPuckPlugin({ config: digitalPuckConfig }))
    .renderReactTree((children: React.ReactNode) => (
    <MyApp>{children}</MyApp>
));
```
#### Options
| key      | type                | description                    |
|----------|---------------------|--------------------------------|
| `config` | `DigitalPuckConfig` | The puck configuration object. |


