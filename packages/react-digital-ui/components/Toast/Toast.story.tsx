import type { Meta, StoryObj } from '@storybook/react';
import component, { type ToastProps } from './Toast';

const meta: Meta<ToastProps> = {
    title: 'Layout/Toast',
    component,
};
type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    argTypes: {
        variant: { control: 'select', options: ['info', 'error', 'success'] },
        hidden: { control: 'boolean' },
    },
    args: {
        children: 'This is a Toast that as been toasted!',
        hidden: false,
    },
};
