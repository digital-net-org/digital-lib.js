import type { Entity } from '../../core';

export interface EditorConfig<T extends Entity> {
    store: string;
    // TODO: Should be handled using api Schema
    onCreate: () => Partial<T>;
}
