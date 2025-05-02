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
            <Box gap={2} m={2}>
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
        required: false,
        loading: false,
        disabled: false,
        fullWidth: false,
        borderless: false,
    },
};

export const Primary: Story = {
    decorators: Story => (
        <Box m={2}>
            <Story />
        </Box>
    ),
    argTypes: {
        pattern: { control: 'select', options: ['[a-zA-Z0-9]+', '[0-9]+'] },
        type: { control: 'radio', options: ['text', 'password', 'email'] },
        required: { control: 'boolean' },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        borderless: { control: 'boolean' },
        label: { control: 'text' },
        help: { control: 'text' },
    },
    args: {
        type: 'text',
        pattern: undefined,
        required: false,
        loading: false,
        disabled: false,
        fullWidth: false,
        borderless: false,
        label: '',
        help: '',
    },
};
