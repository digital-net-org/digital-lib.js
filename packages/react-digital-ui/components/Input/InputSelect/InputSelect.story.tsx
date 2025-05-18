/* eslint react-hooks/rules-of-hooks: 0 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputSelect, type InputSelectProps } from './InputSelect';
import { Box } from '../../Box';
import { Text } from '../../Text';

const meta: Meta<InputSelectProps> = {
    title: 'Inputs/InputSelect',
    component: InputSelect,
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
        label: 'String',
        options: ['option 1', 'option 2', 'option 3'],
        onAccess: (value: string) => value,
        onRender: (value?: string) => value ?? '-',
    },
    decorators: (Story, { args }) => {
        const [value, setValue] = React.useState(args.options[0]);
        return <Story {...args} value={value} onChange={setValue} />;
    },
};

export const StringSelector: Story = {
    decorators: () => {
        const options = ['option 1', 'option 2', 'option 3'];
        const [stringValue, setStringValue] = React.useState<string | undefined>(options[0]);
        const handleChange = (value?: string) => {
            setStringValue(value);
        };

        return (
            <Box direction="column" gap={2}>
                <InputSelect
                    required
                    options={options}
                    value={stringValue}
                    onChange={handleChange}
                    onAccess={value => value}
                    onRender={value => value ?? '-'}
                />
                <Text variant="JSON">{stringValue}</Text>
            </Box>
        );
    },
};

export const RecordSelector: Story = {
    decorators: () => {
        const options = [
            { id: 1, value: 'value 1' },
            { id: 2, value: 'value 2' },
            { id: 3, value: 'value 3' },
        ];
        const [objValue, setObjValue] = React.useState<Record<string, any>>();

        return (
            <Box direction="column" gap={2}>
                <InputSelect
                    options={options}
                    value={objValue}
                    onChange={value => setObjValue(value)}
                    onAccess={value => value?.id.toString()}
                    onRender={value => value?.value ?? '-'}
                />
                <Text variant="JSON">
                    {/* @ts-ignore */}
                    {objValue}
                </Text>
            </Box>
        );
    },
};
