/* eslint react-hooks/rules-of-hooks: 0 */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box } from '../../Box';
import { InputSwitch, type InputSwitchProps } from './InputSwitch';

const meta: Meta<InputSwitchProps> = {
    title: 'Inputs/InputSwitch',
    component: InputSwitch,
    argTypes: {
        name: {
            control: { type: 'text' },
        },
        required: {
            control: { type: 'boolean' },
        },
        loading: {
            control: { type: 'boolean' },
        },
        disabled: {
            control: { type: 'boolean' },
        },
    },
};
type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    args: {
        name: 'switch',
        required: false,
        loading: false,
        disabled: false,
    },
};

export const StateTests: Story = {
    decorators: () => {
        const [value, setValue] = React.useState<boolean>(false);
        const onChange = (checked: boolean) => setValue(checked);
        return (
            <Box gap={2}>
                <InputSwitch value={value} onChange={onChange} />
                <Box>
                    State content:
                    <pre>{JSON.stringify(value, null, 2)}</pre>
                </Box>
            </Box>
        );
    },
    args: {
        name: 'switch',
        required: false,
        loading: false,
        disabled: false,
    },
};
