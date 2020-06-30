/// <reference types="react" />
import { StrictInputProps } from 'semantic-ui-react';
import { TranslationGeneric } from '../../util';
export declare type Props<TM> = {
    onChange: (value: string) => void;
    value: string;
    required?: boolean;
    placeholder?: keyof TM;
    inputType?: string;
    label?: keyof TM;
} & Omit<StrictInputProps, 'onChange' | 'type' | 'value' | 'label'>;
export declare const TextInput: <TM extends TranslationGeneric>(props: Props<TM>) => JSX.Element;
