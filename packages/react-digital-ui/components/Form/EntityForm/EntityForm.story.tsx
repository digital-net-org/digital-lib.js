/* eslint react-hooks/rules-of-hooks: 0 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { Entity } from '../../../../core';
import { Box } from '../../Box';
import EntityForm, { type EntityFormProps } from './EntityForm';
import { type TestEntity, testEntity, testSchema } from './EntityForm.story.helper';

const meta: Meta<EntityFormProps<Entity>> = {
    title: 'Inputs/EntityForm',
    component: EntityForm,
};

type Story = StoryObj<typeof meta>;
export default meta;

export const StateTests: Story = {
    decorators: () => {
        const [value, setValue] = React.useState<TestEntity>(testEntity);
        const onChange = (entity: Partial<TestEntity>) => setValue(prev => ({ ...prev, ...entity }));
        return (
            <Box gap={2}>
                <EntityForm
                    entity={value}
                    onChange={onChange}
                    schema={testSchema}
                />
                <Box>
                    State content:
                    <pre>
                        {JSON.stringify(value, null, 2)}
                    </pre>
                </Box>
            </Box>
        );
    },
    args: {
    },
};

// export const SubmitTests: Story = {};
