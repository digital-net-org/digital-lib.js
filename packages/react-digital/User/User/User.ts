import type { UserModel } from '../../../dto';

export interface User extends Partial<UserModel> {
    login: (body: Record<string, any>) => void;
    logout: () => void;
    refresh: () => void;
    isLoading: boolean;
    isLogged: boolean;
}
