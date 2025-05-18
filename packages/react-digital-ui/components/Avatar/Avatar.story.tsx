import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, type AvatarProps } from './Avatar';
import { Box } from '../Box';

const meta: Meta<AvatarProps> = {
    title: 'Images/Avatar',
    decorators: (_, { args }) =>
        args.fullWidth ? (
            <React.Fragment>
                <style>{`.DigitalUi-Box { border: 1px solid red; }`}</style>
                <Box resizable>
                    <Avatar {...args} />
                </Box>
            </React.Fragment>
        ) : (
            <Avatar {...args} onClick={() => 0} />
        ),
};
type Story = StoryObj<typeof meta>;
export default meta;

export const Small: Story = {
    argTypes: {
        color: {
            control: { type: 'select' },
            options: ['primary', 'disabled', 'text'],
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
        },
        fullWidth: {
            control: { type: 'boolean' },
        },
        src: {
            control: { type: 'text' },
        },
    },
    args: {
        color: 'text',
        size: 'small',
        fullWidth: false,
        src: '',
    },
};

export const Medium: Story = {
    args: {
        ...Small.args,
        size: 'medium',
    },
    argTypes: Small.argTypes,
};

export const Large: Story = {
    args: {
        ...Small.args,
        size: 'large',
    },
    argTypes: Small.argTypes,
};

export const FullWidth: Story = {
    args: {
        ...Small.args,
        fullWidth: true,
    },
    argTypes: Small.argTypes,
};
