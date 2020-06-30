/// <reference types="react" />
import { StrictInputProps } from 'semantic-ui-react';
import { TranslationGeneric } from '../../util';
export declare type Props<TM> = {
    onChange: (value: number) => void;
    value: number;
    step?: number;
    label?: keyof TM;
    max?: number;
    min?: number;
    required?: boolean;
} & Omit<StrictInputProps, 'onChange' | 'type' | 'value' | 'label'>;
export declare const NumberInput: <TM extends TranslationGeneric>(props: Props<TM>) => JSX.Element;
