import type { Meta, StoryObj } from '@storybook/react';
import component, { type TextProps } from './Text';

const meta: Meta<TextProps> = {
    title: 'Text/Text',
    component,
};
type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    argTypes: {
        children: {
            control: { type: 'text' },
        },
        bold: {
            control: { type: 'boolean' },
        },
        italic: {
            control: { type: 'boolean' },
        },
        variant: {
            control: { type: 'select' },
            options: ['h1', 'h2', 'h3', 'text', 'span', 'caption', 'JSON', 'section-title'],
        },
    },
    args: {
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        bold: false,
        italic: false,
        variant: 'text',
    },
};
