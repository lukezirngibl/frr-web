/// <reference types="react" />
import { TranslationGeneric } from '../../util';
export declare type Props<TM> = {
    onChange: (value: boolean) => void;
    value: boolean;
    disabled?: boolean;
    error: boolean;
    required?: boolean;
    name?: string;
    label: keyof TM;
};
export declare const SingleCheckbox: <TM extends TranslationGeneric>(props: Props<TM>) => JSX.Element;
