/* eslint react-hooks/rules-of-hooks: 0 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InputNav, { type InputNavProps } from './InputNav';
import { Box } from '../../Box';
import { Text } from '../../Text';

const meta: Meta<InputNavProps> = {
    title: 'Inputs/InputNav',
    component: InputNav,
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    argTypes: {},
    args: {},
    decorators: () => {
        const [value, setValue] = React.useState<string>();
        return <InputNav options={['Option 1', 'Option 2', 'Option 3']} value={value} onSelect={id => setValue(id)} />;
    },
};
