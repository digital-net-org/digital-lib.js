import type {Entity, EntitySchema} from '../../../dto';
import {Icon, Loader, EntityForm, Box, Button} from '../..';
import React, {Dispatch, SetStateAction} from "react";
import {useClassName} from "../../../react-digital";

interface EntityPageProps<T extends Entity>{
    id: string | undefined;
    isLoading: boolean;
    isQuerying: boolean;
    onDelete?: () => void;
    onSave?: () => void;
    schema: EntitySchema;
    payload: T | undefined;
    setPayload:  Dispatch<SetStateAction<T | undefined>>;
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
    const className = useClassName({}, 'Edit');

    return (
        <Box>
            <Box className={className}>
                <Box className={`${className}-State`}>
                    <Box />
                    <Box>
                        {title}
                    </Box>
                    <Box direction="row" align="center" gap={1} p={1}>
                        {onSave && (
                            <Button
                                form={id}
                                type="submit"
                                variant="icon"
                                disabled={isLoading}
                                onClick={onSave}
                            >
                                <Icon.FloppyIcon variant="outlined" size="small" color="text" />
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                type="button"
                                variant="icon"
                                disabled={isLoading}
                                onClick={onDelete}
                            >
                                <Icon.TrashIcon variant="outlined" size="small" color="text" />
                            </Button>
                        )}
                    </Box>
                </Box>
                {isQuerying || !payload ? (
                    <Loader />
                ) : (
                    <EntityForm id={id} schema={schema} value={payload} onChange={setPayload} onSubmit={onSave} />
                )}
            </Box>
        </Box>
    );
}