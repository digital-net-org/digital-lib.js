import type { IDb } from './types/IDb';
import type { IDbConfig } from './types/IDbConfig';
import type { IDbInfo } from './types/IDbInfo';
import type { IDbAccessorCallbacks } from './types/IDbAccessorCallbacks';

type IDbAccessorCallback = 'onerror' | 'onsuccess' | 'onupgradeneeded';

/**
 * Indexed database accessor utilities
 */
export default class IDbAccessor {
    private static pkName = 'id';
    private static pkIndex = 'unique_id';

    private static storeExists(db: IDBDatabase, store: string): boolean {
        return db.objectStoreNames.contains(store);
    }

    /**
     * Access the database
     * @param config - database configuration, contains name, version and available stores
     * @param handlers - event handlers for callbacks
     */
    public static accessDatabase(
        config: IDbInfo,
        handlers: Partial<Record<IDbAccessorCallback, (db: IDb, resolve: () => void) => void>>,
    ): Promise<void> {
        return new Promise((resolve) => {
            const request = indexedDB.open(config.name, config.version);
            Object.entries(handlers).forEach(([key, callback]) => {
                request[key as IDbAccessorCallback] = (event: Event) => callback({
                    db: request.result,
                    event,
                    ...config,
                    stores: [...request.result.objectStoreNames],
                }, resolve);
            });
        });
    }

    /**
     * Initialize the database
     * @param config - database configuration, contains name, version and available stores
     * @param callbacks - event handlers for callbacks
     */
    public static async initDatabase({ 
        onSuccess,
        onError,
        onResolve,
        ...config
    }: IDbConfig & IDbAccessorCallbacks): Promise<void> {
        await this.accessDatabase(config, {
            onupgradeneeded: ({ db }) => {
                config.stores.forEach((store) => {
                    if (!this.storeExists(db, store)) {
                        const objectStore = db.createObjectStore(store, { keyPath: 'id' });
                        objectStore.createIndex(`${store}_${this.pkIndex}`, this.pkName, { unique: true });
                    }
                });
            },
            onsuccess: () => {
                onSuccess?.();
                onResolve?.();
            },
            onerror: ({ db, version }) => {
                onError?.(new Error(`IDbAccessor: Unhandled error while initializing ${db}" database v${version}`));
                onResolve?.();
            },
        });
    }
}
