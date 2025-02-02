import { type Data, usePuck } from '@measured/puck';
import type { Entity } from '../../core';
import PuckDataHelper from './PuckDataHelper';

export default function usePuckState() {
    const { dispatch, appState } = usePuck();

    const setState = (data: any | undefined, id?: Entity['id']) => {
        const parsed = { ...(PuckDataHelper.resolve(data)), id: id ? String(id) : undefined } satisfies Data;
        dispatch({ type: 'setData', data: parsed });
    };
    
    return [appState.data as Data, setState] as const;
}
