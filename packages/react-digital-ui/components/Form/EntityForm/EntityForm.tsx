import { type Entity, type EntitySchema, StringResolver } from '../../../../core';

import React from 'react';
import { InputSwitch, InputText } from '../../Input';
import { Box } from '../../Box';
import { Text } from '../../Text';
import EntityFormSwitch from './EntityFormSwitch';

interface EntityFormProps<T extends Entity> {
    schema: EntitySchema;
    entity: T;
}

export default function EntityForm<T extends Entity>({
    schema,
    entity,
}: EntityFormProps<T>) {
    return (
        <form>
            {schema.map((s) => {
                const resolvedName = StringResolver.toCamelCase(s.name) as keyof T;

                if (s.isForeignKey || s.isIdentity || s.isReadOnly || !s.isRequired) {
                    return;
                }
                if (s.type === 'String') {
                    return (
                        <InputText
                            value={entity[resolvedName] as string}
                            onChange={() => {}}
                            label={s.name}
                            key={s.name}
                        />
                    );
                }
                if (s.type === 'Boolean') {
                    return <EntityFormSwitch schema={s} entity={entity} />;
                }
            })}
        </form>
    );
}
