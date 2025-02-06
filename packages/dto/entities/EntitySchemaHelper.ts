import type { EntitySchema } from './EntitySchema';

export default class EntitySchemaHelper {
    public static getFlag(schema: EntitySchema | undefined, flag: string) {
        return (schema ?? []).find(property => property.dataFlag === flag)?.name?.toLowerCase();
    }
}
