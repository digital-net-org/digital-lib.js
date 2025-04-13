import type { Entity } from '@digital-lib/dto';

export interface DocumentModel extends Entity {
    fileName?: string;
    mimeType?: string;
    fileSize: number;
    uploaderId: string;
}
