import { FormField, SingleFormField } from './Form';
declare type Fn<T, E> = (i: SingleFormField<T, E>) => boolean;
export declare const someFormFields: <T, E>(formFields: FormField<T, E>[], fn: Fn<T, E>) => boolean;
export {};
