import React from 'react';
import type { EntitySchema, Result } from '../../core';
import useDigitalQuery from '../useDigitalQuery';

export default function useSchema(endpoint: string) {
    const [schema, setSchema] = React.useState<EntitySchema | undefined>();
    const { data, isLoading } = useDigitalQuery<Result<EntitySchema>>(`${endpoint}/schema`);
    React.useEffect(() => data ? setSchema(data?.value) : void 0, [data]);

    return {
        schema,
        isLoading,
    };
}
