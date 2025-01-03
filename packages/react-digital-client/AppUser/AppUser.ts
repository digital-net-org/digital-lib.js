import type { StoredAppUser } from './StoredAppUser';

export interface AppUser extends StoredAppUser {
    login: (body: Record<string, any>) => void;
    logout: () => void;
    loading: boolean;
    isLogged: () => boolean;
    isExpired: () => boolean;
}
