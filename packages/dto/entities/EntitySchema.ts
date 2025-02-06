export interface EntitySchemaProperty {
    name: string;
    path: string;
    type: string;
    dataFlag: string;
    isReadOnly: boolean;
    isSecret: boolean;
    isRequired: boolean;
    isUnique: boolean;
    maxLength?: number;
    isIdentity: boolean;
    isForeignKey: boolean;
    regexValidation: string;
}

export type EntitySchema = Array<EntitySchemaProperty>;
