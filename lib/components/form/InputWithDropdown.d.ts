/// <reference types="react" />
import { TranslationGeneric } from '../../util';
export declare type Props<TM> = {
    onChange: (value: string) => void;
    value: string;
    error: boolean;
    options: Array<{
        label?: keyof TM;
        name?: string;
        value: string;
    }>;
    required?: boolean;
    placeholder: string;
    label?: keyof TM;
};
export declare const InputWithDropdown: <TM extends TranslationGeneric>(props: Props<TM>) => JSX.Element;
