import type { EntitySchema } from '../../../dto';
import { Localization } from '../../../react-digital';
import { Text } from '../Text';

interface TableHeadProps {
    schema: EntitySchema;
}

export default function TableHead({ schema }: TableHeadProps) {
    return (
        <thead>
            <tr>
                {schema.map(s => (
                    <th key={s.name} style={{ border: 'solid 1px white', padding: '.5rem' }}>
                        <Text size="small">{s.name}</Text>
                        <Text size="small" italic variant="caption">
                            {s.type}
                        </Text>
                    </th>
                ))}
                <th>
                    <Text size="small">{Localization.translate('ui-table:actions')}</Text>
                </th>
            </tr>
        </thead>
    );
}
