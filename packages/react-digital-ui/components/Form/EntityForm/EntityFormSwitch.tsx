import { Text } from '../../Text';
import { InputSwitch } from '../../Input';
import { Box } from '../../Box';
import React from 'react';
import { type Entity, type EntitySchemaProperty, StringResolver } from '../../../../core';

interface EntityFormSwitchProps<T extends Entity> {
    schema: EntitySchemaProperty;
    entity: T;
}

export default function EntityFormSwitch<T extends Entity>({
    schema,
    entity,
}: EntityFormSwitchProps<T>) {
    const resolvedValue = React.useMemo(() => {
        const resolvedName = StringResolver.toCamelCase(schema.name) as keyof T;
        return entity[resolvedName] as boolean;
    }, [entity, schema.name]);

    const [value, setValue] = React.useState(resolvedValue);
    const onChange = (checked: boolean) => {
        console.log('checked', checked);
        setValue(checked);
    };

    return (
        <Box direction="row" align="center" gap={1} key={schema.name}>
            <Text>{schema.name}</Text>
            <InputSwitch value={value} onChange={onChange} />
        </Box>
    );
}
