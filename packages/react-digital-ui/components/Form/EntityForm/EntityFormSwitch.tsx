import { Text } from '../../Text';
import { InputSwitch } from '../../Input';
import { Box } from '../../Box';
import React from 'react';
import { type Entity, type EntitySchemaProperty, StringResolver } from '../../../../core';

interface EntityFormSwitchProps<T extends Entity> {
    schema: EntitySchemaProperty;
    value: boolean;
    onChange: (value: boolean) => void;
}

export default function EntityFormSwitch<T extends Entity>({
    schema,
    value,
    onChange,
}: EntityFormSwitchProps<T>) {
    return (
        <Box direction="row" align="center" gap={1} key={schema.name}>
            <Text>{schema.name}</Text>
            <InputSwitch value={value} onChange={onChange} />
        </Box>
    );
}
