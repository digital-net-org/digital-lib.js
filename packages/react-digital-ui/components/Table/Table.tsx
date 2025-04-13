import React from 'react';
import type { Entity } from '@digital-lib/dto';
import { Box } from '../Box';
import TableHead from './TableHead';
import TableRow from './TableRow';
import './Table.styles.css';

export interface TableProps<T extends Entity> {
    entities: T[];
    renderRow?: (row: T) => React.ReactNode;
    renderHeader?: (key: keyof T) => React.ReactNode;
    columns?: Array<keyof T>;
    onCreate?: () => void;
    onEdit?: (id: T['id']) => void;
    onDelete?: (id: T['id']) => void;
    loading?: boolean;
    disabled?: boolean;
}

export const tableClassName = 'DigitalUi-Table';

export default function Table<T extends Entity>({ entities, columns, ...props }: TableProps<T>) {
    return (
        <Box fullWidth fullHeight overflow="auto">
            <table className={tableClassName}>
                <TableHead columns={columns ?? []} {...props} />
                <tbody className={`${tableClassName}-Body`}>
                    {entities.map(entity => (
                        <TableRow entity={entity} columns={columns ?? []} {...props} />
                    ))}
                </tbody>
            </table>
        </Box>
    );
}
