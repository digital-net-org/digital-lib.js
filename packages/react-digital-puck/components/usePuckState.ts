import { type Data, usePuck } from '@measured/puck';
import type { Entity } from '../../core';
import PuckData from '../PuckData';

export default function usePuckState() {
    const { dispatch, appState } = usePuck();
    const setState = (data: Data | string | undefined, id?: Entity['id']) => {
        const parsed = { ...PuckData.parse({ data }), id: id ? String(id) : undefined } satisfies Data;
        dispatch({ type: 'setData', data: parsed });
    };
    
    return [appState.data as Data, setState] as const;
}
