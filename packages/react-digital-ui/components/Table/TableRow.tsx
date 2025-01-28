import React from 'react';
import { type Entity, type EntitySchema } from '../../../dto';
import { EditActions } from '../Editor';
import { Icon } from '../Icon';
import TableCell from './TableCell';

interface TableRowProps<T extends Entity> {
    schema: EntitySchema;
    entity: T;
    onEdit: (id: string | number) => void;
    onDelete: (id: string | number) => void;
    disabled?: boolean;
    isLoading?: boolean;
}

export default function TableRow<T extends Entity>({ schema, entity, onEdit, onDelete, ...props }: TableRowProps<T>) {
    return (
        <tr key={entity.id}>
            {schema.map(s => (
                <React.Fragment key={s.name}>
                    <TableCell schema={s} entity={entity} />
                </React.Fragment>
            ))}
            <td>
                <EditActions
                    actions={[
                        { icon: Icon.PencilSquare, action: () => onEdit(entity.id) },
                        { icon: Icon.TrashIcon, action: () => onDelete(entity.id) },
                    ]}
                    {...props}
                />
            </td>
        </tr>
    );
}
