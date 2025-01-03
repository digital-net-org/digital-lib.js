import type { StoredAppUser } from './StoredAppUser';

export interface AppUserContextState extends StoredAppUser {
    update: (user: StoredAppUser) => void;
    remove: () => void;
    isLogged: () => boolean;
    isExpired: () => boolean;
}

export const defaultAppUserContextState = {
    update: () => void 0,
    remove: () => void 0,
    isLogged: () => false,
    isExpired: () => false,
};
