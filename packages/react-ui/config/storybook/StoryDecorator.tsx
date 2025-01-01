import { type StoryFn } from '@storybook/react';

export default function StoryDecorator(Story: StoryFn) {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                boxSizing: 'border-box',
                display: 'flex',
                padding: '2rem',
            }}
        >
            <Story />
        </div>
    );
};
