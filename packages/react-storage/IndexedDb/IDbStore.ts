import type { Entity } from '../../core';
import type { IDbInfo } from './types/IDbInfo';
import IDbAccessor from './IDbAccessor';
import type { IDbStoreCallbacks } from './types/IDbStoreCallbacks';

/**
 * Indexed database store accessor utilities
 */
export default class IDbStore {
    private static validateStore(db: IDBDatabase, store: string): void {
        if (![...db.objectStoreNames].includes(store)) {
            throw new Error(`IDbStore: error getting data: store "${store}" does not exist`);
        }
    }

    private static validatePayload<T extends Entity>(data: Partial<T>): Partial<T> {
        if (!data.id) {
            throw new Error('IDbStore: error saving data: id is required');
        }
        return { ...data, id: String(data.id) };
    }

    private static getStore(db: IDBDatabase, store: string, mode?: IDBTransactionMode): IDBObjectStore {
        return db
            .transaction(store, mode ?? 'readwrite')
            .objectStore(store);
    }

    /**
     * Retrieve Entity from the store
     * @param accessor - database configuration, contains name, version and available stores
     * @param store - store name
     * @param id - entity id
     * @param onProcessed - callback to process the retrieved data
     */
    public static async get<T extends Entity>(
        accessor: IDbInfo,
        store: string,
        id: string,
        callbacks: IDbStoreCallbacks<T>,
    ): Promise<void> {
        await IDbAccessor.accessDatabase(accessor, {
            onsuccess: ({ db }, resolve) => {
                this.validateStore(db, store);
                const result = this.getStore(db, store, 'readonly').get(id);
                result.onsuccess = () => callbacks.onSuccess?.(result?.result);
                result.onerror = () => callbacks.onSuccess?.(undefined);
                resolve();
            },
            onerror: () =>
                callbacks.onError?.(new Error(`IDbStore: Unhandled error while getting data from store "${store}"`)),
        });
    };

    /**
     * Save Entity to the store
     * @param accessor - database configuration, contains name, version and available stores
     * @param store - store name
     * @param data - entity data
     */
    public static async save<T extends Entity>(
        accessor: IDbInfo,
        store: string,
        data: Partial<T>,
        callbacks: IDbStoreCallbacks<T>,
    ): Promise<void> {
        await IDbAccessor.accessDatabase(accessor, {
            onsuccess: ({ db }, resolve) => {
                this.validateStore(db, store);
                const payload = this.validatePayload(data);
                const storeObject = this.getStore(db, store);
                const result = storeObject.get(String(payload.id));

                result.onsuccess = () => {
                    const updatedData = { ...(result?.result ?? {}), ...payload };
                    storeObject.put(updatedData);
                    callbacks.onSuccess?.(updatedData);
                    callbacks.onResolve?.();
                    resolve();
                };
                result.onerror = () => {
                    storeObject.add(payload);
                    callbacks.onSuccess?.(payload as T);
                    callbacks.onResolve?.();
                    resolve();
                };
            },
            onerror: () => {
                callbacks.onError?.(new Error(`IDbStore: Unhandled error while getting data from store "${store}"`));
                callbacks.onResolve?.();
            },
        });
    };

    /**
     * Delete Entity from the store
     * @param accessor - database configuration, contains name, version and available stores
     * @param store - store name
     * @param id - entity id
     */
    public static async delete(
        accessor: IDbInfo,
        store: string,
        id: string,
    ): Promise<void> {
        await IDbAccessor.accessDatabase(accessor, {
            onsuccess: ({ db }, resolve) => {
                this.validateStore(db, store);
                this.getStore(db, store, 'readwrite').delete(id);
                resolve();
            },
            onerror: ({ event }) => {
                throw new Error(`useCrud: error deleting data: ${event}`);
            },
        });
    };
}
