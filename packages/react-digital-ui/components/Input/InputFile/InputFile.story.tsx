/* eslint react-hooks/rules-of-hooks: 0 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputFile, type InputFileProps } from './InputFile';
import { Box } from '../../Box';
import { Text } from '../../Text';

const meta: Meta<InputFileProps> = {
    title: 'Inputs/InputFile',
    component: InputFile,
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    argTypes: {
        required: { control: 'boolean' },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        borderless: { control: 'boolean' },
    },
    args: {
        required: false,
        loading: false,
        disabled: false,
        fullWidth: false,
        borderless: false,
    },
    decorators: (Story, { args }) => {
        return (
            <Box gap={2} fullWidth>
                <Story {...args} />
            </Box>
        );
    },
};

export const StateTests: Story = {
    decorators: () => {
        const [value, setValue] = React.useState<Array<File>>();

        React.useEffect(() => console.log(value), [value]);

        return (
            <Box direction="column" gap={2}>
                <Text variant="JSON">
                    {value ? { name: value?.[0].name, size: value?.[0].size, type: value?.[0].type } : undefined}
                </Text>
                <InputFile value={value} onChange={setValue} />
            </Box>
        );
    },
};
