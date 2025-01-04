import type { StoredDigitalUser } from './StoredDigitalUser';

export interface DigitalUser extends StoredDigitalUser {
    login: (body: Record<string, any>) => void;
    logout: () => void;
    loading: boolean;
    isLogged: () => boolean;
    isExpired: () => boolean;
}
