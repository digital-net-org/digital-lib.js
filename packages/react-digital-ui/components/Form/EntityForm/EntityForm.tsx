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
    const [formData, setFormData] = React.useState<Partial<T>>(() =>
        schema.reduce((acc, s) => {
            if (!s.isForeignKey && !s.isIdentity && !s.isReadOnly && s.isRequired) {
                const resolvedName = StringResolver.toCamelCase(s.name) as keyof T;
                acc[resolvedName] = entity[resolvedName];
            }
            return acc;
        }, {} as Partial<T>),
    );

    React.useEffect(() => {
        onFormChange(formData);
    }, [formData, onFormChange]);

    const updateField = (key: keyof T, value: any) => {
        setFormData(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <form>
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
                            value={formData[resolvedName] as string}
                            onChange={value => updateField(resolvedName, value)}
                        />
                    );
                }
                if (s.type === 'Boolean') {
                    return (
                        <EntityFormSwitch
                            key={s.name}
                            schema={s}
                            value={formData[resolvedName] as boolean}
                            onChange={value => updateField(resolvedName, value)}
                        />
                    );
                }
            })}
        </form>
    );
}
