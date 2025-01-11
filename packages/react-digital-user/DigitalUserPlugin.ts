import { type ReactDigitalPlugin } from '../react-digital';
import { AuthInterceptor, AuthRedirect } from './middlewares';
import {
    type PartialDigitalUserConfig,
    type DigitalUserConfig,
    DigitalUserConfigProvider,
    ConfigBuilder,
} from './config';

export default class DigitalClientPlugin implements ReactDigitalPlugin<DigitalUserConfig> {
    public readonly config: DigitalUserConfig;
    public readonly Provider = DigitalUserConfigProvider;
    public readonly Middlewares = [AuthInterceptor, AuthRedirect];

    constructor(config?: PartialDigitalUserConfig) {
        this.config = ConfigBuilder.build(config ?? {});
    }
}
