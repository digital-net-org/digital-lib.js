import type { IDbInfo } from './IDbInfo';

export interface IDbConfig extends IDbInfo {
    stores: Array<string>;
}
