import type { StoredDigitalUser } from './StoredDigitalUser';

export interface DigitalUser extends StoredDigitalUser {
    login: (body: Record<string, any>) => void;
    logout: () => void;
    isLoading: boolean;
    isLogged: boolean;
    isUnauthorized: boolean;
    deleteStoredUser: () => void;
    updateStoredUser: (user: StoredDigitalUser) => void;
}
