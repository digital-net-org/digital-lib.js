import type { Data } from '@measured/puck';

export default class PuckData {
    public static readonly default: Data = {
        root: { props: { title: '' } },
        zones: {},
        content: [],
    };

    public static toStoredData({ id: _, ...data }: Data): string {
        return JSON.stringify(data);
    }

    public static fromStoredData(data: string | unknown): Data {
        return typeof data === 'string' ? JSON.parse(data) : this.default;
    }
}
