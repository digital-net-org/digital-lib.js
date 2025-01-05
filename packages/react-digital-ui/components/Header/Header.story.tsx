import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Header, { type HeaderProps } from './Header';
import { Box } from '../Box';

const meta: Meta<HeaderProps> = {
    title: 'Layout/Header',
    component: Header,
    decorators: (_) => {
        return (
            <React.Fragment>
                <style>{` #frame { border: 1px solid red; } `}</style>
                <Box id="frame" fullWidth fullHeight>
                    <Header>
                        <Box color="#0079fc">Content</Box>
                        <Box color="#ff4785">Content</Box>
                        <Box color="#66bf3c">Content</Box>
                    </Header>
                </Box>
            </React.Fragment>
        );
    },
    argTypes: {},
};
type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {};
