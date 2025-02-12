<h1>
    <img width="300" src="https://raw.githubusercontent.com/digital-net-org/.github/refs/heads/master/assets/logo_v2025.svg">
</h1>
<div justify="center">
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/Typescript-blue.svg?color=3178c6"></a>
    <a href="https://puckeditor.com/"><img src="https://img.shields.io/badge/Puck-black.svg?color=111111"></a>
</div>

_@digital-net-org/digital-lib.js_

A collection of packages that provide a set of tools and utilities to build **React/NextJs** applications.

## Packages
| Package (doc)                                                             | Description                                                                                                                                                                     |
|---------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **core**                                                                  | Collection of low-level utilities and helpers for Javascript/Typescript. Contains basics **[Digital.Net](https://github.com/Safari-digital/Digital.Net)** types and interfaces. |
| **[react-digital](./packages/react-digital/README.md)**                   | Main component of the react library. Mandatory for any "react-digital" plugin.                                                                                                  |
| **[react-digital-client](./packages/react-digital-client/README.md)**     | Collection of hooks and utilities to handle data fetching and state management.                                                                                                 |
| **[react-digital-debug](./packages/react-digital-debug/README.md)**       | React Dev/debugging Tools.                                                                                                                                                      |
| **[react-digital-editor](./packages/react-digital-editor/README.md)**     | Extension of **_digital-ui_**, contain editors that handles state management/data-fetching.                                                                                     |
| **[react-digital-idb](./packages/react-digital-idb/README.md)**           | IndexedDB wrapper for React.                                                                                                                                                    |
| **[react-digital-localize](./packages/react-digital-localize/README.md)** | Localization tools for React using [i18Next](https://www.i18next.com).                                                                                                          |
| **[react-digital-ui](./packages/react-digital-ui/README.md)**             | Collection of React UI components and utilities. Handles dark/light theme management.                                                                                           |
| **[react-digital-user](./packages/react-digital-user/README.md)**         | Handles user authentication and authorization. Require ***react-digital-client***.                                                                                              |

## Installation
### Submodules
Create a `packages` directory in the root of your project and use the following command:
```bash
git@github.com:Safari-digital/digital-net.git packages/digital-net
```

Then update your `tsconfig.json` file to include the new package and add the alias alias:
```json
"paths": {
    "@digital-net/*": ["packages/digital-net/packages/*"]
},
"include": ["src", "packages"]
```

Update your `vite.config.ts` with the new aliases:
```typescript
resolve: {
    alias: {
      '@digital-net': resolve(__dirname, 'packages/digital-net/packages/'),
    },
},
```

## Usage
### Create a new Plugin
Use the `ReactDigitalPlugin` interface to create a new plugin class. See the following example:

```typescript
// DigitalClientPlugin.ts
import { type ReactDigitalPlugin } from '../react-digital';
import { ConfigBuilder, type DigitalUserConfig, DigitalUserConfigProvider } from './config';
import { AuthInterceptor, AuthRedirect } from './middlewares';

// Implement the ReactDigitalPlugin interface
export default class DigitalClientPlugin implements ReactDigitalPlugin<DigitalUserConfig> {
  // config property cannot contain null or undefined values
  public readonly config: DigitalUserConfig;
  // Add the React context Provider component
  public readonly Provider = DigitalUserConfigProvider;
  // Add the middlewares if any
  public readonly Middlewares = [AuthInterceptor, AuthRedirect];
  
  /*
  * Middlewares and Providers MUST use the same config object. Here defined as "DigitalUserConfig".
  */

  constructor(config?: Partial<DigitalUserConfig>) {
    this.config = ConfigBuilder.build(config ?? {});
  }
}
```