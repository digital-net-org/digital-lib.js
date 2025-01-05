import BaseComponent from './Form';
import Field from './FormField';

export type { FormProps } from './Form';
export type { FormFieldProps } from './FormField';
export { default as useForm } from './useForm';
export const Form = Object.assign(BaseComponent, { Field });
