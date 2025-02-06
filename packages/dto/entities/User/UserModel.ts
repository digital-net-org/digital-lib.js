import type { AvatarModel } from '../Avatar/AvatarModel';
import type { Entity } from '../Entity';

export interface UserModel extends Entity {
    username: string;
    email: string;
    role: number;
    avatar?: AvatarModel;
    isActive: boolean;
}
