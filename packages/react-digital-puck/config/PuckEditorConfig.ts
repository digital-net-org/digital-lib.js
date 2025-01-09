import type { Entity } from '../../core';
import type { PuckEditorContextState } from '../context/PuckEditorContext';
import type { Config } from '@measured/puck';

export interface PuckEditorConfig<T extends Entity> extends PuckEditorContextState<T> {
    config: Config;
    store: string;
    onCreate: () => Partial<T>;
}
