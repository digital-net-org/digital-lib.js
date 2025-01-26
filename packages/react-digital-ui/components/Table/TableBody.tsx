import React from 'react';
import type { Entity } from '../../../core';
import type { TableProps } from './Table';
import TableRow from './TableRow';

export default function TableBodyProps<T extends Entity>({
    schema,
    entities,
    ...props
}: TableProps<T>) {
    return (
        <tbody>
            {entities.map(entity => (
                <React.Fragment key={entity.id}>
                    <TableRow entity={entity} schema={schema} {...props} />
                </React.Fragment>
            ))}
        </tbody>
    );
}
