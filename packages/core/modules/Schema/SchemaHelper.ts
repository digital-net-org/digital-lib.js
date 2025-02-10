export default class SchemaHelper {
    public static resolve(type: string) {
        if (type === 'String'
            || type === 'char') {
            return 'string';
        }
        if (type === 'Boolean'
            || type === 'bool') {
            return 'boolean';
        }
        if (type === 'DateTime') {
            return 'Date';
        }
        if (type === 'Number'
            || type === 'int'
            || type === 'long'
            || type === 'integer') {
            return 'number';
        } else return type;
    }
}
