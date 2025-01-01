import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import component from './Loader';
import { Box } from '../Box';

const meta: Meta = {
    title: 'Loading/Loader',
    component,
    decorators: Story => (
        <Box fullWidth fullHeight justify="center" align="center">
            <Story />
        </Box>
    ),
};
type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    argTypes: {
        color: {
            control: { type: 'select' },
            options: ['primary', 'text', 'disabled'],
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'large', 'medium'],
        },
    },
    args: {
        color: 'text',
        size: 'medium',
    },
};
