import { StringIdentity } from '../../../core';
import { PuckDataHelper } from '../../../react-digital-puck';
import type { Entity } from '../Entity';

export interface FrameModel extends Entity {
    name: string;
    data: string;
}

export class FrameModelHelper {
    static getDefaultPayload(): Partial<FrameModel> {
        return {
            data: JSON.stringify(PuckDataHelper.default),
            name: StringIdentity.generate(),
        };
    }
}
