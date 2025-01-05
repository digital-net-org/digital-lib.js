import React from 'react';
import FormField, { type FormFieldProps } from './FormField';

interface FormState extends Omit<FormFieldProps, 'value' | 'onChange'> {
    id: string;
    default?: string;
}

export interface Patch {
    op: string;
    path: string;
    value: any;
}

export default function useForm(values: Array<FormState>) {
    const [state, dispatch] = React.useReducer(
        (state: Record<string, string>, action: Record<string, string>) => ({ ...state, ...action }),
        values.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.default ?? '' }), {}),
    );

    const formState: Array<FormFieldProps> = React.useMemo(
        () =>
            values.map(({ id, default: _, ...rest }) => ({
                value: state[id],
                onChange: (value: string) => dispatch({ [id]: value }),
                id,
                ...rest,
            })),
        [state, values],
    );

    const formBody = React.useMemo(
        () => formState.reduce((acc, { id, value }) => ({ ...acc, [id as string]: value }), {}),
        [formState],
    );

    const formPatch: Array<Patch> = React.useMemo(() => {
        return values.reduce((acc: Patch[], { id, default: defaultValue }) => {
            const value = state[id];
            if (value !== defaultValue) {
                acc.push({ op: 'replace', path: `/${id}`, value });
            }
            return acc;
        }, []);
    }, [state, values]);

    const renderFields = React.useCallback(
        () => formState.map(({ id, ...rest }) => <FormField {...rest} id={id} key={id} />),
        [formState],
    );

    return {
        formState,
        formBody,
        formPatch,
        renderFields,
    };
}
