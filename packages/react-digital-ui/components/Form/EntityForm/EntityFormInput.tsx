import { InputText } from '../../Input';
import React from 'react';
import { type Entity, type EntitySchemaProperty } from '../../../../core';
import { Box } from '../../Box';
import type { ControlledHandler } from '../../types';

interface EntityFormInputProps<T extends Entity> {
    schema: EntitySchemaProperty;
    value: string;
    onChange: ControlledHandler<string>;
}

export default function EntityFormInput<T extends Entity>({
    schema,
    onChange,
    value,
}: EntityFormInputProps<T>) {
    return (
        <Box direction="row" align="center" gap={1} key={schema.name}>
            <InputText
                value={value}
                onChange={value => onChange(value)}
                label={schema.name}
            />
        </Box>
    );
}
