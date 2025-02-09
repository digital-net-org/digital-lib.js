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
        const onChange = (entity: TestEntity) => setValue(prev => ({ ...prev, ...entity }));
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

export const SubmitTests: Story = {
    decorators: () => {
        const [value, setValue] = React.useState<TestEntity>();

        const onSubmit = (data: TestEntity) => {
            setValue(data);
        };

        return (
            <Box gap={2}>
                <EntityForm
                    id="test"
                    defaultEntity={testEntity}
                    onSubmit={onSubmit}
                    schema={testSchema}
                />
                <button type="submit" form="test">Submit</button>
                <Box>
                    Submit content:
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
