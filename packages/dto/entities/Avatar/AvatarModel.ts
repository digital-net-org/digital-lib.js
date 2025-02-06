import type { Entity } from '../Entity';

export interface AvatarModel extends Entity {
    documentId: string;
    posX: number;
    posY: number;
}
