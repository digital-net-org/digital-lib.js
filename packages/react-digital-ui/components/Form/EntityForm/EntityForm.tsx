import { type Entity, type EntitySchema, StringResolver } from '../../../../core';
import React from 'react';
import { InputSwitch, InputText } from '../../Input';
import { Text } from '../../Text';
import { type BoxProps, Box } from '../../Box';

export interface EntityFormProps<T extends Entity> extends Omit<BoxProps, 'onChange' | 'onSubmit'> {
    schema: EntitySchema;
    entity: T;
    onChange?: (data: Partial<T>) => void;
    onSubmit?: (data: Partial<T>) => void;
}

export default function EntityForm<T extends Entity>({
    id,
    schema,
    entity,
    onChange,
    onSubmit,
    ...boxProps
}: EntityFormProps<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const value = e.target.value;
        const path = e.target.name;
        console.log(value, path);
        return onChange?.(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const sendData = Object.fromEntries(formData);
        console.log('sendData', e.currentTarget);
    };

    return (
        <form
            id={id}
            onChange={handleChange}
            onSubmit={handleSubmit}
        >
            <Box direction="column" gap={1} {...boxProps}>
                {schema.map((s) => {
                    if (s.isForeignKey || s.isIdentity || s.isReadOnly || !s.isRequired) {
                        return;
                    }
                    const resolvedName = StringResolver.toCamelCase(s.name) as keyof T;
                    if (s.type === 'String') {
                        return (
                            <React.Fragment key={s.name}>
                                <InputText
                                    label={s.name}
                                    id={s.name}
                                    defaultValue={entity[resolvedName] as string}
                                />
                            </React.Fragment>
                        );
                    }
                    if (s.type === 'Boolean') {
                        return (
                            <React.Fragment key={s.name}>
                                <Box direction="row" align="center" gap={1}>
                                    <Text>{s.name}</Text>
                                    <InputSwitch id={s.name} defaultChecked={entity[resolvedName] as boolean} />
                                </Box>
                            </React.Fragment>
                        );
                    }
                })}
            </Box>
        </form>
    );
}
