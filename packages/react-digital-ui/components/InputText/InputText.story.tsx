/* eslint react-hooks/rules-of-hooks: 0 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InputText, { type InputTextProps } from './InputText';

const meta: Meta<InputTextProps> = {
    title: 'Inputs/InputText',
    component: InputText,
    decorators: (Story, { args }) => {
        const [value, setValue] = React.useState('');
        return (
            <Story {...args} onChange={setValue} value={value} />
        );
    },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    argTypes: {
        pattern: { control: 'select', options: ['[a-zA-Z0-9]+', '[0-9]+'] },
        patternMessage: { control: 'text' },
        type: { control: 'radio', options: ['text', 'password', 'email'] },
        required: { control: 'boolean' },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
    },
    args: {
        type: 'text',
        pattern: undefined,
        patternMessage: 'Invalid input',
        required: false,
        loading: false,
        disabled: false,
        fullWidth: false,
    },
};
