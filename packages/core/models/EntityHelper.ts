import type { Entity } from './Entity';
import type { EntityRaw } from './EntityRaw';

/**
 * Helper class for **Entity**.
 */
export default class EntityHelper {
    /**
     * Builds an entity from a json object.
     * @param entity The entity to build.
     * @returns The built entity.
     */
    public static build<T extends Entity>(entity: EntityRaw): T {
        return {
            ...entity,
            createdAt: new Date(entity.createdAt),
            updatedAt: entity.updatedAt ? new Date(entity.updatedAt) : undefined,
        } as T;
    }

    /**
     * Gets the most recently created entity from a list of entities.
     * @param entities The entities to search.
     * @returns The most recently created entity.
     */
    public static getLatest<T extends Entity>(entities: T[]): T | undefined {
        return entities.find(
            entity => entity.createdAt.getTime() === Math.max(...entities.map(e => e.createdAt.getTime())),
        );
    }

    /**
     * Gets an entity by its ID.
     * @param entities The entities to search.
     * @param id The ID of the entity to find.
     * @returns The entity with the given ID.
     */
    public static getById<T extends Entity>(entities: T[], id: string | number | undefined): T | undefined {
        return entities.find(entity => String(entity.id) === String(id));
    }
}
