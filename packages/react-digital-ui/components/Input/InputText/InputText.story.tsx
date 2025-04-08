/* eslint react-hooks/rules-of-hooks: 0 */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box } from '../../Box';
import InputText, { type InputTextProps } from './InputText';

const meta: Meta<InputTextProps> = {
    title: 'Inputs/InputText',
    component: InputText,
};

type Story = StoryObj<typeof meta>;
export default meta;

export const StateTests: Story = {
    decorators: () => {
        const [value, setValue] = React.useState<string>();
        return (
            <Box gap={2}>
                <InputText type="text" onChange={setValue} value={value} />
                <Box>
                    State content:
                    <pre>{JSON.stringify(value, null, 2)}</pre>
                </Box>
            </Box>
        );
    },
    args: {
        type: 'text',
        pattern: undefined,
        patternMessage: 'Invalid input',
        required: false,
        loading: false,
        disabled: false,
        fullWidth: false,
        borderless: false,
    },
};

export const Primary: Story = {
    argTypes: {
        pattern: { control: 'select', options: ['[a-zA-Z0-9]+', '[0-9]+'] },
        patternMessage: { control: 'text' },
        type: { control: 'radio', options: ['text', 'password', 'email'] },
        required: { control: 'boolean' },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        borderless: { control: 'boolean' },
    },
    args: {
        type: 'text',
        pattern: undefined,
        patternMessage: 'Invalid input',
        required: false,
        loading: false,
        disabled: false,
        fullWidth: false,
        borderless: false,
    },
};
