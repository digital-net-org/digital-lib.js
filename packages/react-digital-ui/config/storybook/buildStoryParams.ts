import type { Preview } from '@storybook/react';

export const buildStoryParams = (
    decorators: Preview['decorators'],
    parameters?: Preview['parameters'],
): Preview => {
    return {
        decorators,
        parameters: {
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
            ...(parameters ?? {}),
        },
    };
};
