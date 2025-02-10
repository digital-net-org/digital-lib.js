import React from 'react';
import { StringResolver } from '../../../../core';
import { type Entity, type EntitySchema } from '../../../../dto';
import { type BoxProps, Box } from '../../Box';
import { InputSwitch, InputText } from '../../Input';
import { Text } from '../../Text';

export interface EntityFormProps<T extends Entity> extends Omit<BoxProps, 'onChange' | 'onSubmit'> {
    schema: EntitySchema;
    value: T;
    onChange: (entity: T) => void;
    onSubmit: () => void;
}

export default function EntityForm<T extends Entity>({
    id,
    schema,
    value,
    onChange,
    onSubmit,
    ...boxProps
}: EntityFormProps<T>) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        return onSubmit();
    };

    const handleChange = (target: { value: any, name: string }) => {
        console.log(target)
        onChange?.({ ...value, [target.name]: target.value });
    };

    return (
        <form
            id={id}
            onSubmit={handleSubmit}
        >
            <Box direction="column" gap={1} {...boxProps}>
                {schema.map((s) => {
                    if (s.isForeignKey || s.isIdentity || s.isReadOnly || !s.isRequired) {
                        return;
                    }
                    const resolvedName = StringResolver.toCamelCase(s.name);
                    if (s.type === 'String') {
                        return (
                            <React.Fragment key={resolvedName}>
                                <InputText
                                    label={s.name}
                                    id={resolvedName}
                                    name={resolvedName}
                                    value={value[resolvedName as keyof T] as string}
                                    onChange={(e) => handleChange({ name: resolvedName, value: e })}
                                />
                            </React.Fragment>
                        );
                    }
                    if (s.type === 'Boolean') {
                        return (
                            <React.Fragment key={resolvedName}>
                                <Box direction="row" align="center" gap={1}>
                                    <Text>{s.name}</Text>
                                    <InputSwitch
                                        name={s.name}
                                        id={resolvedName}
                                        value={value[resolvedName as keyof T] as boolean}
                                        onChange={(e) => handleChange({ name: resolvedName, value: e })}
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
