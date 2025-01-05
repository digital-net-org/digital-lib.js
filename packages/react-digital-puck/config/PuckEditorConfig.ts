import type { Entity } from '../../core';
import type { PuckEditorContextState } from '../context/PuckEditorContext';

export interface PuckEditorConfig<T extends Entity> extends PuckEditorContextState<T> {
    store: string;
    onCreate: () => Partial<T>;
}
