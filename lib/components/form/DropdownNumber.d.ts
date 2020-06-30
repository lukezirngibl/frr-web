/// <reference types="react" />
import { StrictDropdownProps as SemanticDropdownProps } from 'semantic-ui-react';
import { TranslationGeneric } from '../../util';
export declare type Props<TM> = {
    label?: keyof TM;
    required?: boolean;
    options: Array<{
        label: keyof TM;
        value: number;
    }>;
    onChange: (value: number) => void;
    error: boolean;
    value: number;
} & Omit<SemanticDropdownProps, 'onChange' | 'value' | 'options'>;
export declare const DropdownNumber: <TM extends TranslationGeneric>(props: Props<TM>) => JSX.Element;
