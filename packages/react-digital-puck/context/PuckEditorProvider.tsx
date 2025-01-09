import React from 'react';
import { type Data, Puck } from '@measured/puck';
import { type Entity } from '../../core';
import { EditorDataProvider } from '../../react-digital-editor';
import { useIDbStore } from '../../react-digital-idb';
import { type PuckEditorConfig } from '../config/PuckEditorConfig';
import { PuckEditorContext } from './PuckEditorContext';
import PuckEditor from '../components/PuckEditor';
import { PuckData } from '../config';

export default function PuckEditorProvider<T extends Entity>({
    store,
    onCreate,
    config,
    ...stateProps
}: PuckEditorConfig<T>) {
    const [selected, setSelected] = React.useState<string | undefined>();
    const { save } = useIDbStore<T>(store);

    const handleDataChange = async ({ id, ...data }: Data) => {
        if (!id) {
            return;
        } else if (id !== selected) {
            setSelected(id);
            return;
        }
        console.log('PUCK: UPDATE', id);
        await save({ id, [stateProps.accessor]: data } as Partial<T>);
        return data;
    };

    return (
        <Puck
            config={config}
            onChange={handleDataChange}
            data={PuckData.default}
        >
            <EditorDataProvider store={store} onCreate={onCreate}>
                <PuckEditorContext.Provider value={stateProps}>
                    <PuckEditor />
                </PuckEditorContext.Provider>
            </EditorDataProvider>
        </Puck>
    );
}
