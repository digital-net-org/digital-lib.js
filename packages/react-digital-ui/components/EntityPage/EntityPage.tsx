import type {Entity, EntitySchema} from '../../../dto';
import { Edit, Icon, Loader, EntityForm } from '../..';
import {Dispatch, SetStateAction} from "react";

interface EntityPageProps<T extends Entity>{
    id: string | undefined;
    isLoading: boolean;
    isQuerying: boolean;
    handleDelete: () => void;
    handlePatch: () => void;
    schema: EntitySchema;
    payload: T | undefined;
    setPayload:  Dispatch<SetStateAction<T | undefined>>;
}

export default function EntityPage<T extends Entity>({
    id,
    isLoading,
    isQuerying,
    handleDelete,
    handlePatch,
    schema,
    payload,
    setPayload,
}: EntityPageProps<T>) {
    return (
        <div>
            <Edit
                renderName={() => id}
                actions={[
                    { icon: Icon.FloppyIcon, disabled: isLoading, formId: id },
                    { icon: Icon.TrashIcon, action: handleDelete, disabled: isLoading },
                ]}
            >
                {isQuerying || !payload ? (
                    <Loader />
                ) : (
                    <EntityForm id={id} schema={schema} value={payload} onChange={setPayload} onSubmit={handlePatch} />
                )}
            </Edit>
        </div>
    );
}