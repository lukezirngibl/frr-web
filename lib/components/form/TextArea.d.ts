/// <reference types="react" />
import { TranslationGeneric } from '../../util';
export declare type TextAreaProps<TM> = {
    onChange: (value: string) => void;
    value: string;
    error: boolean;
    disabled?: boolean;
    label?: keyof TM;
};
export declare const TextArea: <TM extends TranslationGeneric>(props: TextAreaProps<TM>) => JSX.Element;
