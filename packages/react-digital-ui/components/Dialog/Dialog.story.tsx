/* eslint react-hooks/rules-of-hooks: 0 */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Dialog, { type DialogProps } from './Dialog';
import { Button } from '../Button';

const meta: Meta<DialogProps> = {
    title: 'Layout/Dialog',
    component: Dialog,
    decorators: () => {
        const [open, setOpen] = React.useState(true);

        return (
            <React.Fragment>
                <Button onClick={() => setOpen(true)}>Open Dialog</Button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <Dialog.Content>
                        Hello World, Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nisi qui aliquid animi
                        deserunt earum, accusantium numquam corrupti quibusdam minima ut sequi sit blanditiis? Dolorem
                        unde deserunt ex quo voluptate.
                    </Dialog.Content>
                    <Dialog.Header>Hello World</Dialog.Header>
                    <Dialog.Panel>Panel with stuff</Dialog.Panel>
                </Dialog>
            </React.Fragment>
        );
    },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {};
