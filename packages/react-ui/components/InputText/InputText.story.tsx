import type { Meta, StoryObj } from '@storybook/react';
import InputText, { type InputTextProps } from './InputText';

const meta: Meta<InputTextProps> = {
    title: 'Inputs/InputText',
    component: InputText,
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    argTypes: {
        value: { control: 'text' },
        onChange: { action: 'onChange' },
        pattern: { control: 'select', options: ['[a-zA-Z0-9]+', '[0-9]+'] },
        patternMessage: { control: 'text' },
        type: { control: 'radio', options: ['text', 'password', 'email'] },
        required: { control: 'boolean' },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
    },
    args: {
        value: '',
        onChange: (value: string) => console.log(value),
        type: 'text',
        pattern: undefined,
        patternMessage: 'Invalid input',
        required: false,
        loading: false,
        disabled: false,
        fullWidth: false,
    },
};
