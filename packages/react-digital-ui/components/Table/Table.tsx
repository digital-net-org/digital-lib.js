import React from 'react';
import type { Entity, Pagination } from '@digital-lib/dto';
import { Box } from '../Box';
import { Loader } from '../Loader';
import { Text } from '../Text';
import TableHead from './TableHead';
import TableRow from './TableRow';
import './Table.styles.css';

export interface TableProps<T extends Entity> {
    entities: T[];
    renderRow?: (row: T) => React.ReactNode;
    renderHeader?: (key: keyof T) => React.ReactNode;
    renderEmpty?: () => React.ReactNode;
    columns?: Array<keyof T>;
    onCreate?: () => void;
    onEdit?: (id: T['id']) => void;
    onDelete?: (id: T['id']) => void;
    loading?: boolean;
    disabled?: boolean;
    pagination?: Pagination;
}

export const tableClassName = 'DigitalUi-Table';

export default function Table<T extends Entity>({ loading, entities, columns, renderEmpty, ...props }: TableProps<T>) {
    const isEmpty = React.useMemo(
        () => !loading && !entities.length && renderEmpty,
        [entities.length, loading, renderEmpty]
    );

    return (
        <Box fullWidth fullHeight overflow="auto">
            <table className={tableClassName}>
                <TableHead columns={columns ?? []} loading={loading} {...props} />
                {!loading && !isEmpty && (
                    <tbody className={`${tableClassName}-Body`}>
                        {entities.map(entity => (
                            <React.Fragment key={entity.id}>
                                <TableRow entity={entity} columns={columns ?? []} {...props} />
                            </React.Fragment>
                        ))}
                    </tbody>
                )}
            </table>
            {(isEmpty || loading) && (
                <Box fullWidth fullHeight align="center" justify="center">
                    {isEmpty && <Text>{renderEmpty?.()}</Text>}
                    {loading && <Loader size="medium" />}
                </Box>
            )}
        </Box>
    );
}
