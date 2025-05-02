import type { Preview } from '@storybook/react';

export const parameters: Preview['parameters'] = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: 'fullscreen',
    options: {
        storySort: {
            order: ['*'],
        },
    },
};
