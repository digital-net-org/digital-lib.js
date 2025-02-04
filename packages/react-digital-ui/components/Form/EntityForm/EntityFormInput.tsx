import { InputText } from '../../Input';
import React from 'react';
import { type EntitySchemaProperty } from '../../../../core';
import { Box } from '../../Box';
import type { ControlledHandler } from '../../types';

interface EntityFormInputProps {
    schema: EntitySchemaProperty;
    value: string;
    onChange: ControlledHandler<string>;
}

export default function EntityFormInput({
    schema,
    onChange,
    value,
}: EntityFormInputProps) {
    return (
        <Box direction="row" align="center" gap={1} key={schema.name}>
            <InputText
                value={value}
                onChange={onChange}
                label={schema.name}
                id={schema.name}
            />
        </Box>
    );
}
