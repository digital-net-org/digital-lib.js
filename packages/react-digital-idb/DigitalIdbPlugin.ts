import type { ReactDigitalPlugin } from '../react-digital';
import type { IDbConfig } from './types/IDbConfig';
import DigitalIdbProvider from './DigitalIdbProvider';

export default class DigitalClientPlugin implements ReactDigitalPlugin<IDbConfig> {
    public readonly config: IDbConfig;
    public readonly Provider = DigitalIdbProvider;
    public readonly Middlewares = [];

    constructor(config: IDbConfig) {
        this.config = config;
    }
}
