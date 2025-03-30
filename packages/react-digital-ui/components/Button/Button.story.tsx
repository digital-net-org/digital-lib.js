import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button, { type ButtonProps } from './Button';
import { Icon as IconComponent } from '../Icon';

const meta: Meta<ButtonProps> = {
    title: 'Inputs/Button',
    component: Button,
    decorators: (Story, { args }) =>
        args.variant === 'icon' ? (
            <Button {...args}>
                <IconComponent.GearIcon />
            </Button>
        ) : (
            <Story {...args} />
        ),
};
type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    argTypes: {
        children: {
            control: { type: 'text' },
        },
        loading: {
            control: { type: 'boolean' },
        },
        disabled: {
            control: { type: 'boolean' },
        },
        critical: {
            control: { type: 'boolean' },
        },
        selected: {
            control: { type: 'boolean' },
        },
        fullWidth: {
            control: { type: 'boolean' },
        },
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'text', 'icon'],
        },
        align: {
            control: { type: 'select' },
            options: ['left', 'right', 'none'],
        },
        id: {
            control: { type: 'text' },
        },
        className: {
            control: { type: 'text' },
        },
    },
    args: {
        variant: 'primary',
        children: 'Primary Button',
        disabled: false,
        selected: false,
        critical: false,
        loading: false,
        fullWidth: false,
    },
};

export const Secondary: Story = {
    args: {
        ...Primary.args,
        variant: 'secondary',
        children: 'Secondary Button',
    },
    argTypes: Primary.argTypes,
};

export const Text: Story = {
    args: {
        ...Primary.args,
        variant: 'text',
        children: 'Text Button',
    },
    argTypes: Primary.argTypes,
};

export const Icon: Story = {
    args: {
        ...Primary.args,
        variant: 'icon',
    },
    argTypes: Primary.argTypes,
};
