import type { ReactDigitalPlugin } from '../react-digital';
import DigitalPuckProvider from './DigitalPuckProvider';
import type { DigitalPuckConfig } from './config';

export default class DigitalPuckPlugin implements ReactDigitalPlugin<DigitalPuckConfig> {
    public readonly config: DigitalPuckConfig;
    public readonly Provider = DigitalPuckProvider;
    public readonly Middlewares = [];

    constructor(config?: Partial<DigitalPuckConfig>) {
        this.config = {
            config: { components: {} },
            ...(config ?? {}),
        };
    }
}
