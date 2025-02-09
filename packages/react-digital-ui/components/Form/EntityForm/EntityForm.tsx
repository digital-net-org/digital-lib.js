import { type Entity, type EntitySchema, StringResolver } from '../../../../core';
import React from 'react';
import { InputSwitch, InputText } from '../../Input';
import { Text } from '../../Text';
import { type BoxProps, Box } from '../../Box';

export interface EntityFormProps<T extends Entity> extends Omit<BoxProps, 'onChange' | 'onSubmit'> {
    schema: EntitySchema;
    entity?: T;
    defaultEntity?: T;
    onChange?: (entity: T) => void;
    onSubmit?: (entity: T) => void;
}

export default function EntityForm<T extends Entity>({
    id,
    schema,
    entity,
    defaultEntity,
    onChange,
    onSubmit,
    ...boxProps
}: EntityFormProps<T>) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitting', e.currentTarget.elements);
        const formElements = (Array.from(e.currentTarget.elements) as HTMLInputElement[]).reduce((acc, element) => {
            if (!element.name || element.name.length === 0) {
                return acc;
            }
            acc[element.name as keyof T] = element.value as any;
            return acc;
        }, {} as T);
        console.log('formElements', formElements);
        return onSubmit?.(formElements as T);
    };

    const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const { name, value } = e.target;
        onChange?.({ [StringResolver.toCamelCase(name)]: value } as T);
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
                                    name={s.name}
                                    defaultValue={defaultEntity?.[resolvedName] as string}
                                    value={entity?.[resolvedName] as string}
                                />
                            </React.Fragment>
                        );
                    }
                    if (s.type === 'Boolean') {
                        return (
                            <React.Fragment key={s.name}>
                                <Box direction="row" align="center" gap={1}>
                                    <Text>{s.name}</Text>
                                    <InputSwitch
                                        id={s.name}
                                        defaultChecked={defaultEntity?.[resolvedName] as boolean}
                                        value={entity?.[resolvedName] as boolean}
                                        name={s.name}
                                    />
                                </Box>
                            </React.Fragment>
                        );
                    }
                })}
            </Box>
        </form>
    );
}
