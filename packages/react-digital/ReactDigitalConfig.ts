import type { RouterProps } from './Router';
import type { ClientConfig } from '../react-digital-client';
import type { IDbConfig } from '../react-digital-idb';
import type { PartialDigitalUserConfig } from '../react-digital-user';
import type { DigitalLocalizeConfig } from '../react-digital-localize/config/DigitalLocalizeConfig';

export interface ReactDigitalConfig
    extends
    ClientConfig,
    PartialDigitalUserConfig {
    i18nConfig?: Partial<DigitalLocalizeConfig>;
    idbConfig: IDbConfig;
    rootElement?: HTMLElement | null;
    strictMode?: boolean;
    router?: RouterProps['router'];
}
