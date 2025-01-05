<p align="center">
    <img width="300" src="/assets/logo-v1_full.svg">
</p>
<div align="center">
    <a href="https://github.com/safari-digital"><img src="https://img.shields.io/badge/safari-digital-green.svg"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Typescript-blue.svg"></a>
</div>

## digital-net/react-digital-ui
Collection of React UI components and utilities. Handles dark/light theme management.

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
    .addPlugin(new DigitalUiPlugin())
    .renderReactTree((children: React.ReactNode) => (
    <MyApp>{children}</MyApp>
));
```
#### Options
Does not have any options.

Import the base styles-sheet in your application.
#### Example
```tsx
import '@digital-net/react-digital-ui/assets/digital-net.default.css';
```

Override the default styles by importing the `digital-net.custom.css` file and adding your custom styles.

```css
/* digital-net.custom.css */
:root {
    --spacing-1: 0.5rem;
    --spacing-2: 1rem;
    --spacing-3: 1.5rem;
    --spacing-radius-1: 0.25rem;
    --spacing-radius-2: 0.5rem;
    --spacing-radius-3: 0.75rem;
    --spacing-radius-100: 100%;

    --palette-primary: rgba(0, 126, 109, 0.5);
    --palette-primary-light: #56a9a0;
    --palette-text: #222222;
    --palette-text-disabled: #707070;
    --palette-background: #f0f0f0;
    --palette-background-disabled: #d2d2d2;
    --palette-paper: #fcfcfc;
    --palette-border: #707070;
    --palette-border-disabled: #b2b2b2;
    --palette-shadow: #00000050;
    --palette-shadow-light: #00000020;
    --palette-error: #b62929;

    --font-family: 'Roboto', monospace;
    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;
    --font-size-small: 0.75rem;
    --font-size-regular: 1rem;
    --font-size-medium: 1.275rem;
    --font-size-large: 1.5rem;
    --font-size-xlarge: 2rem;
    --font-letter-spacing: 0.0375rem;
}

[data-theme='dark'] {
    --palette-primary: rgba(9, 205, 178, 0.5);
    --palette-primary-light: #56a9a0;
    --palette-text: #f0f0f0;
    --palette-text-disabled: #707070;
    --palette-background: #181818;
    --palette-background-disabled: #353535;
    --palette-paper: #222222;
    --palette-border: #707070;
    --palette-border-disabled: #b2b2b2;
    --palette-shadow: #00000050;
    --palette-shadow-light: #00000020;
    --palette-error: #b62929;
}
```

### Usage
#### ThemeSwitch
The `ThemeSwitch` component is a simple button that toggles the theme of the application. The component does not 
require any props as it handles the theme change internally.

```tsx
import React from 'react';
import { Box, ThemeSwitch } from '@digital-net/react-digital-ui';

export default function AppBar() {
    return (
        <Box>
            <ThemeSwitch />
        </Box>
    );
}
```