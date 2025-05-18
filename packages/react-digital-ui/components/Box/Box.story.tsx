import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, type BoxProps } from './Box';

const meta: Meta<BoxProps> = {
    title: 'Layout/Box',
    component: Box,
};
export default meta;

export const Primary: StoryObj<typeof meta> = {
    decorators: Story => (
        <React.Fragment>
            <style>{`.DigitalUi-Box { background-color: pink; }`}</style>
            <Story />
        </React.Fragment>
    ),
    args: {
        children: (
            <React.Fragment>
                <div>Child 1</div>
                <div>Child 2</div>
                <div>Child 3</div>
            </React.Fragment>
        ),
        fullWidth: false,
        fullHeight: false,
        resizable: false,
        wrap: false,
        direction: 'row',
        align: 'start',
        justify: 'start',
        p: 1,
        m: 1,
        gap: 0,
    },
    argTypes: {
        fullWidth: {
            control: {
                type: 'boolean',
            },
        },
        fullHeight: {
            control: {
                type: 'boolean',
            },
        },
        resizable: {
            control: {
                type: 'boolean',
            },
        },
        wrap: {
            control: {
                type: 'boolean',
            },
        },
        direction: {
            control: {
                type: 'select',
                options: ['row', 'column'],
            },
        },
        align: {
            control: {
                type: 'select',
                options: ['start', 'center', 'end'],
            },
        },
        justify: {
            control: {
                type: 'select',
                options: ['start', 'center', 'end'],
            },
        },
        p: {
            control: {
                type: 'number',
            },
        },
        m: {
            control: {
                type: 'number',
            },
        },
        gap: {
            control: {
                type: 'number',
            },
        },
        children: {
            control: {
                type: 'text',
            },
        },
    },
};
