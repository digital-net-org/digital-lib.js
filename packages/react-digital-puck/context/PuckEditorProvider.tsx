import React from 'react';
import { type Entity } from '../../core';
import { EditorDataProvider } from '../../react-digital-editor';
import { type PuckEditorConfig } from '../config/PuckEditorConfig';
import { PuckEditorContext } from './PuckEditorContext';
import PuckEditor from '../components/PuckEditor';

export default function PuckEditorProvider<T extends Entity>({ store, onCreate, ...stateProps }: PuckEditorConfig<T>) {
    return (
        <EditorDataProvider store={store} onCreate={onCreate}>
            <PuckEditorContext.Provider value={stateProps}>
                <PuckEditor />
            </PuckEditorContext.Provider>
        </EditorDataProvider>
    );
}
