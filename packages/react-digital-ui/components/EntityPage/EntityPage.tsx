import type { Entity, EntitySchema } from '../../../dto';
import { Icon, Loader, EntityForm, Box, Edit } from '../..';
import React, { type Dispatch, type SetStateAction } from 'react';

interface EntityPageProps<T extends Entity> {
    id: string | undefined;
    isLoading: boolean;
    onDelete?: () => void;
    onSave?: () => void;
    isDeleteLoading?: boolean;
    isSaveLoading?: boolean;
    isDeleteDisabled?: boolean;
    isSaveDisabled?: boolean;
    isMutated?: boolean;
    schema: EntitySchema;
    payload: T | undefined;
    setPayload: Dispatch<SetStateAction<T | undefined>>;
    title: string | undefined;
}

export default function EntityPage<T extends Entity>({
    id,
    isLoading,
    onDelete,
    onSave,
    isDeleteLoading,
    isSaveLoading,
    isDeleteDisabled,
    isSaveDisabled,
    isMutated,
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
                    ...(onSave
                        ? [
                              {
                                  icon: Icon.FloppyIcon,
                                  disabled: isSaveLoading || isSaveDisabled || !isMutated,
                                  action: onSave,
                              },
                          ]
                        : []),
                    ...(onDelete
                        ? [{ icon: Icon.TrashIcon, disabled: isDeleteLoading || isDeleteDisabled, action: onDelete }]
                        : []),
                ]}
                isLoading={isLoading}
                isModified={isMutated}
            >
                {isLoading || !payload ? (
                    <Loader />
                ) : (
                    <EntityForm id={id} schema={schema} value={payload} onChange={setPayload} onSubmit={onSave} />
                )}
            </Edit>
        </Box>
    );
}
