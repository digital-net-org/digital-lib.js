import type { Data } from '@measured/puck';

export default class PuckData {
    public static readonly default: Data = {
        root: { props: { title: '' } },
        zones: {},
        content: [],
    };
}
