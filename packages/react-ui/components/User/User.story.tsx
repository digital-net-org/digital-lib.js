import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import User, { type UserProps } from './User';

const meta: Meta<UserProps> = {
    title: 'Inputs/User',
    component: User,
};
type Story = StoryObj<typeof meta>;
export default meta;

export const Button: Story = {
    decorators: (Story, { args }) => {
        const handleClick = (userId: string) => console.log(`Clicked:${userId}`);
        return <Story {...args} onClick={handleClick} />;
    },
    argTypes: {
        username: {
            control: { type: 'text' },
        },
        id: {
            control: { type: 'text' },
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
        },
        inverted: {
            control: { type: 'boolean' },
        },
    },
    args: {
        username: 'John Doe',
        id: '1',
        size: 'small',
        inverted: false,
    },
};

export const Row: Story = {
    decorators: (Story, { args }) => {
        return <Story {...args} />;
    },
    argTypes: {
        username: {
            control: { type: 'text' },
        },
        id: {
            control: { type: 'text' },
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
        },
        inverted: {
            control: { type: 'boolean' },
        },
    },
    args: {
        username: 'John Doe',
        id: '1',
        size: 'small',
        inverted: false,
        onClick: undefined,
    },
};
