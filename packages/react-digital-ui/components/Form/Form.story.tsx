/* eslint react-hooks/rules-of-hooks: 0 */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box } from '../Box';
import Form, { type FormProps } from './Form';
import FormField from './FormField';
import useForm from './useForm';

const meta: Meta<FormProps> = {
    title: 'Inputs/Form',
    component: Form,
};

type Story = StoryObj<typeof meta>;
export default meta;

export const ManualForm: Story = {
    decorators: (_, { args }) => {
        const { formState: fields } = useForm([
            { id: 'Required', label: 'Required', default: 'default', type: 'text', required: true },
            { id: 'Email', label: 'Email', default: 'default', type: 'email', required: true },
            {
                id: 'Pattern',
                label: 'Pattern',
                default: 'default',
                type: 'text',
                pattern: '^[A-Za-z]+$',
                patternMessage: 'Only letters are allowed',
            },
        ]);

        return (
            <React.Fragment>
                <Box>
                    <Form onSubmit={() => console.log('data', fields)} loading={args.loading}>
                        {fields.map(({ id, ...rest }) => (
                            <FormField {...rest} key={id} />
                        ))}
                    </Form>
                    <pre>
                        <code>{JSON.stringify(fields, null, 2)}</code>
                    </pre>
                </Box>
            </React.Fragment>
        );
    },
    argTypes: {
        loading: { control: 'boolean' },
    },
    args: {
        loading: false,
    },
};

export const HookRenderedForm: Story = {
    decorators: (_, { args }) => {
        const { formState, formBody, formPatch, renderFields } = useForm([
            { id: 'Test', label: 'Test', default: '', type: 'text' },
        ]);
        return (
            <Form
                onSubmit={(form) => {
                    console.log('state', formState);
                    console.log('form', form);
                    console.log('patch', formPatch);
                    console.log('body', formBody);
                }}
                loading={args.loading}
            >
                {renderFields()}
            </Form>
        );
    },
    argTypes: {
        loading: { control: 'boolean' },
    },
    args: {
        loading: false,
    },
};
