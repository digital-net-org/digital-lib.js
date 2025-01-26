/* eslint react-hooks/rules-of-hooks: 0 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../../Box';
import component, { type InputSwitchProps } from './InputSwitch';

const meta: Meta<InputSwitchProps> = {
    title: 'Inputs/InputSwitch',
    component,
    decorators: (Story) => {
        const [value, setValue] = React.useState(false);
        const onChange = (checked: boolean) => setValue(checked);
        return (
            <Box>
                <Story value={value} onChange={onChange} />
            </Box>
        );
    },
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
