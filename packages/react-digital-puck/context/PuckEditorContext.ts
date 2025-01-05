import React from 'react';
import { type Entity } from '../../core';
import { type Tool } from '../components/Tools';

export type RenderEntityText<T extends Entity = Entity> = (entity: T) => string;
export type RenderToolName = (toolId: Tool['id']) => string;

export interface PuckEditorContextState<T extends Entity> {
    renderEntityName: RenderEntityText<T>;
    renderToolName: RenderToolName;
    accessor: keyof T;
}

export const defaultValues: PuckEditorContextState<any> = {
    renderEntityName: () => '',
    renderToolName: () => '',
    accessor: 'id',
};

export const PuckEditorContext = React.createContext<PuckEditorContextState<any>>(defaultValues);
