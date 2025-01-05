import { type ReactDigitalPlugin } from '../react-digital';
import { ConfigBuilder, type DigitalUserConfig, DigitalUserConfigProvider } from './config';
import { AuthInterceptor, AuthRedirect } from './middlewares';

export default class DigitalClientPlugin implements ReactDigitalPlugin<DigitalUserConfig> {
    public readonly config: DigitalUserConfig;
    public readonly Provider = DigitalUserConfigProvider;
    public readonly Middlewares = [AuthInterceptor, AuthRedirect];

    constructor(config?: Partial<DigitalUserConfig>) {
        this.config = ConfigBuilder.build(config ?? {});
    }
}
