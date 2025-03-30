/* eslint react-hooks/rules-of-hooks: 0 */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import PopUp, { type PopUpProps } from './PopUp';
import { Button } from '../Button';

const meta: Meta<PopUpProps> = {
    title: 'Layout/PopUp',
    component: PopUp,
    decorators: () => {
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <Button onClick={() => setOpen(true)}>Open PopUp</Button>
                <PopUp title="Hello World" open={open} onClose={() => setOpen(false)}>
                    Hello World, Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nisi qui aliquid animi
                    deserunt earum, accusantium numquam corrupti quibusdam minima ut sequi sit blanditiis? Dolorem unde
                    deserunt ex quo voluptate.
                </PopUp>
            </React.Fragment>
        );
    },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {};
