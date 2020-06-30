import { FormField, SingleFormField } from './Form';
export declare const filterFormFields: <T, E>(formFields: FormField<T, E>[], fn: (i: SingleFormField<T, E>) => boolean) => FormField<T, E>[];
