import React from 'react';
import { usePuck as useMeasuredPuck, type Data } from '@measured/puck';
import { defaultPuckData } from './config';

export default function usePuck() {
    const [id, setId] = React.useState<string>();
    const { dispatch, appState } = useMeasuredPuck();

    const setPuckData = React.useCallback(
        (data: Data | undefined, id?: string | number) => {
            if (id === undefined || !data) {
                setId(undefined);
                dispatch({ type: 'setData', data: defaultPuckData });
                return;
            }
            setId(String(id));
            dispatch({ type: 'setData', data });
        },
        [dispatch],
    );

    return {
        id,
        data: appState.data,
        setPuckData,
    };
}
