import { useNavigate, useParams } from 'react-router-dom';
import { useDelete, useGetById, usePatch, useSchema } from '../../../../react-digital-client';
import React from 'react';
import type { Entity } from '../../../../core';

/**
 * Hook to handle EntityForm actions.
 * @param endpoint The API endpoint.
 * @param redirect The redirect path after a deletion.
 */
export default function useEntityForm<T extends Entity>(endpoint: string, redirect: string) {
    const { id } = useParams();
    const { entity, isQuerying, invalidateQuery: invalidate } = useGetById<T>(endpoint, id);
    const { schema, isLoading: isSchemaLoading } = useSchema(endpoint);
    const navigate = useNavigate();

    const isLoading = React.useMemo(() => isSchemaLoading || isQuerying, [isSchemaLoading, isQuerying]);

    const { patch } = usePatch<T>(endpoint, {
        onSuccess: async () => await invalidate(),
    });

    const { delete: _delete } = useDelete(endpoint, {
        onSuccess: async () => await invalidate(),
    });

    const handlePatch = React.useCallback(
        async (data: T) => {
            if (!id || isLoading) return;
            console.log('patching', id, data);
            patch(id, data);
        },
        [id, isLoading, patch],
    );

    const handleDelete = React.useCallback(
        async () => {
            if (!id || isLoading) return;
            navigate(`/${redirect}`);
            _delete(id);
        },
        [id, isLoading, _delete, navigate, redirect],
    );
    
    return {
        id,
        entity,
        schema,
        isLoading,
        isQuerying,
        handlePatch,
        handleDelete,
    };
}
