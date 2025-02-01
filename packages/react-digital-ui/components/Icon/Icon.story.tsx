import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon as component, type IconProps } from './index';
import { Box } from '../Box';

const meta: Meta<IconProps> = {
    title: 'SVG/Icon',
    decorators: (_, { args }) => (
        <React.Fragment>
            <style>{`.DigitalUi-Box { border: 1px solid red; }`}</style>
            {args.fullWidth
                ? (
                        <Box resizable>
                            <component.AccountIcon {...args} />
                        </Box>
                    )
                : (
                        <Box direction="row" p={1} gap={1} wrap>
                            {Object.values(component).map((Icon, i) => (
                                <Icon key={i} {...args} />
                            ))}
                        </Box>
                    )}
        </React.Fragment>
    ),
};
type Story = StoryObj<typeof meta>;
export default meta;

export const Small: Story = {
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['filled', 'outlined'],
        },
        color: {
            control: { type: 'select' },
            options: ['primary', 'disabled', 'text'],
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
        },
        direction: {
            control: { type: 'select' },
            options: ['up', 'down', 'left', 'right'],
        },
        animation: {
            control: { type: 'boolean' },
        },
        fullWidth: {
            control: { type: 'boolean' },
        },
        id: { control: 'text' },
        className: { control: 'text' },
    },
    args: {
        color: 'text',
        variant: 'filled',
        size: 'small',
        direction: 'up',
        animation: false,
        fullWidth: false,
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

export const Xsmall: Story = {
    args: {
        ...Small.args,
        size: 'x-small',
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
