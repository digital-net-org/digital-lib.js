import { InputText } from '../../Input';
import React from 'react';
import { type Entity, type EntitySchemaProperty, StringResolver } from '../../../../core';
import { Box } from '../../Box';

interface EntityFormInputProps<T extends Entity> {
    schema: EntitySchemaProperty;
    value: string;
    onChange: (value: string) => void;
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
