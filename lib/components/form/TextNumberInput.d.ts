/// <reference types="react" />
import { StrictInputProps } from 'semantic-ui-react';
import { TranslationGeneric } from '../../util';
export declare type Props<TM> = {
    onChange: (n: number) => void;
    value: number;
    required?: boolean;
    inputType?: string;
    label?: keyof TM;
} & Omit<StrictInputProps, 'onChange' | 'type' | 'value' | 'label'>;
export declare const TextNumberInput: <TM extends TranslationGeneric>(props: Props<TM>) => JSX.Element;
