import { type Data, usePuck } from '@measured/puck';

export default function useDigitalPuck() {
    const { dispatch, appState } = usePuck();
    const dispatchData = (data: Data) => dispatch({ type: 'setData', data });
    const data = appState.data as Data;
    return { data, dispatchData };
}
