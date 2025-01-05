import type { ReactDigitalPlugin } from '../react-digital';
import type { DigitalLocalizeConfig } from './config/DigitalLocalizeConfig';
import LocalesProvider from './LocalesProvider';
import ResourcesBuilder from './builder/ResourcesBuilder';

export default class DigitalLocalizePlugin implements ReactDigitalPlugin<DigitalLocalizeConfig> {
    public readonly config: DigitalLocalizeConfig;
    public readonly Provider = LocalesProvider;
    public readonly Middlewares = [];

    constructor(config?: Partial<DigitalLocalizeConfig>) {
        this.config = {
            fallbackLng: config?.fallbackLng ?? 'fr',
            resource: ResourcesBuilder.build(),
        };
    }
}
