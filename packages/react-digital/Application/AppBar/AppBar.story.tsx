import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { type UserModel } from '../../../dto';
import { AppBarLayout as AppBar, type AppBarProps } from './AppBar';

const meta: Meta<AppBarProps> = {
    title: 'Application/Layout/AppBar',
    render: _ => {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '100vh',
                    width: '100vw',
                }}
            >
                <AppBar
                    location="Some page"
                    navigation={[
                        { label: 'Home', selected: true, callback: () => void 0 },
                        { label: 'Edit stuff', callback: () => void 0 },
                    ]}
                    parameters={[]}
                    onLogout={() => void 0}
                    user={{ username: 'Username' } as UserModel}
                    isLoading={false}
                />
            </div>
        );
    },
    // decorators: _ => {},
    argTypes: {},
};
type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {};
