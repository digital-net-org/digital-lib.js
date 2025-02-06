import React from 'react';
import type { EntitySchema, Result } from '../../dto';
import useDigitalQuery from '../useDigitalQuery';

/**
 * Hook to get the schema of an entity. A schema is a JSON object that describes the structure of an entity.
 * @param endpoint The API endpoint.
 */
export default function useSchema(endpoint: string) {
    const { data, isLoading } = useDigitalQuery<Result<EntitySchema>>(`${endpoint}/schema`);
    const schema = React.useMemo(() => data?.value ?? [], [data]);

    return {
        schema,
        isLoading,
    };
}
