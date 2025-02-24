import type { Entity, EntitySchema } from '../../../dto';
import { Icon, Loader, EntityForm, Box, Button, Edit } from '../..';
import React, { type Dispatch, type SetStateAction } from 'react';
import { useClassName } from '../../../react-digital';

interface EntityPageProps<T extends Entity> {
    id: string | undefined;
    isLoading: boolean;
    isQuerying: boolean;
    onDelete?: () => void;
    onSave?: () => void;
    schema: EntitySchema;
    payload: T | undefined;
    setPayload: Dispatch<SetStateAction<T | undefined>>;
    title: string | undefined;
}

export default function EntityPage<T extends Entity>({
    id,
    isLoading,
    isQuerying,
    onDelete,
    onSave,
    schema,
    payload,
    setPayload,
    title,
}: EntityPageProps<T>) {
    return (
        <Box>
            <Edit
                renderName={() => title}
                actions={[
                    ...(onSave ? [{ icon: Icon.FloppyIcon, disabled: isLoading, action: onSave }] : []),
                    ...(onDelete ? [{ icon: Icon.TrashIcon, disabled: isLoading, action: onDelete }] : []),
                ]}
            >
                {isQuerying || !payload ? (
                    <Loader />
                ) : (
                    <EntityForm id={id} schema={schema} value={payload} onChange={setPayload} onSubmit={onSave} />
                )}
            </Edit>
        </Box>
    );
}
