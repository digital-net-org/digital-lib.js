import type { ReactDigitalPlugin } from '../react-digital';
import type { ClientConfig } from './config/ClientConfig';
import DigitalClientProvider from './DigitalClientProvider';

export default class DigitalClientPlugin implements ReactDigitalPlugin<ClientConfig> {
    public readonly config: ClientConfig;
    public readonly Provider = DigitalClientProvider;
    public readonly Middlewares = [];

    constructor(config?: Partial<ClientConfig>) {
        this.config = config ?? {};
    }
}
