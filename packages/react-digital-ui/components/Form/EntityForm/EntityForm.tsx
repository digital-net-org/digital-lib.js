import { type Entity, type EntitySchema, StringResolver } from '../../../../core';
import React from 'react';
import EntityFormSwitch from './EntityFormSwitch';
import EntityFormInput from './EntityFormInput';

interface EntityFormProps<T extends Entity> {
    schema: EntitySchema;
    entity: T;
    onFormChange: (data: Partial<T>) => void;
}

export default function EntityForm<T extends Entity>({
    schema,
    entity,
    onFormChange,
}: EntityFormProps<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const value = e.target.value;
        const path = e.target.name;
        console.log(value, path);
        return onFormChange(value);
    };

    return (
        <form onChange={handleChange}>
            {schema.map((s) => {
                if (s.isForeignKey || s.isIdentity || s.isReadOnly || !s.isRequired) {
                    return;
                }
                const resolvedName = StringResolver.toCamelCase(s.name) as keyof T;
                if (s.type === 'String') {
                    return (
                        <EntityFormInput
                            key={s.name}
                            schema={s}
                            value={entity[resolvedName] as string}
                            onChange={(value) => {
                                onFormChange({ [resolvedName]: value } as Partial<T>);
                            }}
                        />
                    );
                }
                if (s.type === 'Boolean') {
                    return (
                        <EntityFormSwitch
                            key={s.name}
                            schema={s}
                            value={entity[resolvedName] as boolean}
                            onChange={(value) => {
                                onFormChange({ [resolvedName]: value } as Partial<T>);
                            }}
                        />
                    );
                }
            })}
        </form>
    );
}
