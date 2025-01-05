<p align="center">
    <img width="300" src="/assets/logo-v1_full.svg">
</p>
<div align="center">
    <a href="https://github.com/safari-digital"><img src="https://img.shields.io/badge/safari-digital-green.svg"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Typescript-blue.svg"></a>
</div>

## digital-net
**Digital-net** is a collection of packages that provide a set of tools and utilities to build React applications. 
It is designed to be modular and flexible, allowing to pick and choose the tools that are needed for the project. 

#### ⚠️ Warnings
- _This requires React and Vite._
- _This is a work in progress and is not ready for production use._
- _The documentation is incomplete and may not be up to date._


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