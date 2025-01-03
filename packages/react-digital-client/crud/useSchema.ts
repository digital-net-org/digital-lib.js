import React from 'react';
import type { EntitySchema, Result } from '../../core';
import type { CrudConfig } from './types';
import useDigitalQuery from '../useDigitalQuery';

export default function useSchema(config: CrudConfig) {
    const [schema, setSchema] = React.useState<EntitySchema | undefined>();
    const { data, isLoading } = useDigitalQuery<Result<EntitySchema>>(`${config.endpoint}/schema`);
    React.useEffect(() => data ? setSchema(data?.value) : void 0, [data]);

    return {
        schema,
        isLoading,
    };
}
