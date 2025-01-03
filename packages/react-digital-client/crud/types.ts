import type { Entity } from '../../core';
import type useCrud from './useCrud';

export interface CrudConfig {
    api: string;
    endpoint: string;
}

export type CrudApiState<T extends Entity = any> = ReturnType<typeof useCrud<T>>;
