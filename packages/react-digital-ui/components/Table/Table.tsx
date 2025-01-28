import type { Entity, EntitySchema } from '../../../dto';
import TableBody from './TableBody';
import TableHead from './TableHead';

export interface TableProps<T extends Entity> {
    schema: EntitySchema;
    entities: T[];
    onEdit: (id: string | number) => void;
    onDelete: (id: string | number) => void;
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
