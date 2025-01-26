import type { Entity, EntitySchema } from '../../../core';
import TableHead from './TableHead';
import TableBody from './TableBody';

export interface TableProps<T extends Entity> {
    schema: EntitySchema;
    entities: T[];
    onEdit: (entity: T) => void;
    onDelete: (entity: T) => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export default function Table(props: TableProps<any>) {
    return (
        <table>
            <TableHead {...props} />
            <TableBody {...props} />
        </table>
    );
}
