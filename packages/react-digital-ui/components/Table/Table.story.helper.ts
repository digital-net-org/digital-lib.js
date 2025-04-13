import { generateArray, StringRandomizer } from '@digital-lib/core';
import type { Entity } from '@digital-lib/dto';

export interface TestEntity extends Entity {
    name: string;
}

export const testEntities: Array<TestEntity> = generateArray(55, () => ({
    id: StringRandomizer.randomGuid(),
    name: StringRandomizer.GenerateName(),
    createdAt: new Date(),
}));
