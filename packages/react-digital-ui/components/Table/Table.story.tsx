/* eslint react-hooks/rules-of-hooks: 0 */
import type { Meta, StoryObj } from '@storybook/react';
import component, { type TableProps } from './Table';
import { type TestEntity, testEntities } from './Table.story.helper';

const meta: Meta<TableProps<TestEntity>> = {
    title: 'Layout/Table',
    component,
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    args: {
        entities: testEntities,
        columns: ['name', 'createdAt'],
    },
};
