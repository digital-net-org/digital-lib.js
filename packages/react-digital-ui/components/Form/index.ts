import BaseComponent from './Form';
import Field from './FormField';

export type { FormProps } from './Form';
export type { FormFieldProps } from './FormField';
export { default as useForm } from './useForm';
export const Form = Object.assign(BaseComponent, { Field });

export { default as EntityForm, type EntityFormProps } from './EntityForm/EntityForm';
export { default as useEntityForm } from './EntityForm/useEntityForm';

