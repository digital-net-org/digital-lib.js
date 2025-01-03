<p align="center">
    <img width="300" src="/assets/logo-v1_full.svg">
</p>
<div align="center">
    <a href="https://github.com/safari-digital"><img src="https://img.shields.io/badge/safari-digital-green.svg"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Typescript-blue.svg"></a>
</div>

## Packages
- **digital-net/core** 
    
    Is a collection of low-level utilities and helpers for Javascript/Typescript and a **Digital.Net** SDK.
- **digital-net/react-dev-tools** 
    
    Is a collection of React Dev Tools for debugging and development.

- **digital-net/react-digital-client**
    
    Is a collection of hooks and utilities to handle authentication and API requests.

- **digital-net/react-elements**

    Is a collection of hooks and utilities to handle React elements/nodes.

- **digital-net/react-storage**

    Is a collection of hooks and utilities to handle access to local storages (Indexed DB, LocalStorage...).

- **digital-net/react-ui**

    Is a collection of React UI components and utilities.

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

