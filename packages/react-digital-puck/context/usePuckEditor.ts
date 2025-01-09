import React from 'react';
import { type Entity } from '../../core';
import { useEditor } from '../../react-digital-editor';
import { type PuckEditorContextState, PuckEditorContext } from './PuckEditorContext';

export default function usePuckEditor<T extends Entity>() {
    const puckState = React.useContext(PuckEditorContext) as PuckEditorContextState<T>;
    const editorState = useEditor<T>();
    return {
        ...editorState,
        ...puckState,
    };
}
