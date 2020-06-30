/// <reference types="react" />
import { TranslationGeneric } from '../../util';
export declare type CheckboxGroupProps<T> = {
    onChange: (value: Array<string>) => void;
    value: Array<string>;
    error: boolean;
    label?: keyof T;
    options: Array<{
        label: keyof T;
        value: string;
    }>;
};
export declare const CheckboxGroup: <TM extends TranslationGeneric>(props: CheckboxGroupProps<TM>) => JSX.Element;
