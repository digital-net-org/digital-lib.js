<p align="center">
    <img width="300" src="/assets/logo-v1_full.svg">
</p>
<div align="center">
    <a href="https://github.com/safari-digital"><img src="https://img.shields.io/badge/safari-digital-green.svg"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Typescript-blue.svg"></a>
</div>

## Packages
- **digital-net/core** 
  - Collection of low-level utilities and helpers for Javascript/Typescript. 
  - Contains all basics **Digital.Net** types and interfaces.

- **digital-net/react-digital-debug** 
  - Collection of React Dev/debugging Tools.

- **digital-net/react-digital**
  - ReactDigital class that handles the initialization of the React app. 
  - Collection of low-level hooks and utilities to handle React elements/nodes and DOM api.
  - Collection of tools to handle LocalStorage and IndexedDB.

- **digital-net/react-digital-client**
  - Collection of hooks and utilities to handle data fetching and state management _(require @tanstack/react-query)_.
  - Crud hooks to handle data fetching and state management.

- **digital-net/react-digital-editor**

    // TODO

- **digital-net/react-digital-router**
  - Collection of hooks and utilities to handle routing and navigation.
  - Handles dynamic page creation based on folder structure.

- **digital-net/react-digital-user**
  - Handles user authentication and authorization.
  - Require *@digital-net/react-digital-router* and *@digital-net/react-digital-client*.

- **digital-net/react-digital-ui**
  - Collection of React UI components and utilities.

### Installation
#### Submodules
Create a `packages` directory in the root of your project and use the following command:
```bash
git@github.com:Safari-digital/digital-net.git packages/digital-net
```

Then update your `tsconfig.json` file to include the new package and add aliases:
```json
"paths": {
    "@digital-net/core/*": ["packages/digital-net/packages/core/*"],
    "@digital-net/core": ["packages/digital-net/packages/core/index.ts"],
},
"include": ["src", "packages"]
```

Update your `vite.config.ts` with the new aliases:
```typescript
resolve: {
    alias: {
        '@digital-net/core': resolve(__dirname, 'packages/digital-net/packages/core/'),
    },
},
```

