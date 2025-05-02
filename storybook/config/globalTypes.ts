import type {Preview} from "@storybook/react";

export const globalTypes: Preview['globalTypes'] = {
    theme: {
        description: 'Global theme for components',
        toolbar: {
            title: 'Theme',
            icon: 'circlehollow',
            items: ['light', 'dark'],
            dynamicTitle: true,
        },
    },
};