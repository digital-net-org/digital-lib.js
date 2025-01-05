import React from 'react';
import type { Entity } from '../core';
import { type EditorDataContextState, EditorDataContext } from './context/EditorDataContext';

export default function useEditor<T extends Entity = any>() {
    return React.useContext(EditorDataContext) as EditorDataContextState<T>;
}
