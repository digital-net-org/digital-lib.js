import type { Entity } from '../../core';

export interface IDbStoreCallbacks<T extends Entity> {
    onSuccess?: (data: T | undefined) => void;
    onError?: (error: Error) => void;
    onResolve?: () => void;
}
