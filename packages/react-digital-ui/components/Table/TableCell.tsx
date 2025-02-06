import { StringResolver } from '../../../core';
import type { Entity, EntitySchemaProperty } from '../../../dto';
import { Text } from '../Text';

interface TableCellProps<T extends Entity> {
    schema: EntitySchemaProperty;
    entity: T;
}

export default function TableCell<T extends Entity>({ schema, entity }: TableCellProps<T>) {
    return (
        <td key={schema.name} style={{ border: 'solid 1px white', padding: '.5rem' }}>
            <Text size="small">{JSON.stringify(entity[StringResolver.toCamelCase(schema.name) as keyof T])}</Text>
        </td>
    );
}
