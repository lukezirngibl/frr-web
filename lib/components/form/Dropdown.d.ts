/// <reference types="react" />
import { StrictDropdownProps as SemanticDropdownProps } from 'semantic-ui-react';
import { TranslationGeneric } from '../../util';
import { Language } from '../../theme/language';
import { Theme } from '../../theme/theme';
declare type Options<T> = Array<{
    label?: keyof T;
    name?: string;
    value: string;
}>;
export declare type Props<T> = {
    label?: keyof T;
    required?: boolean;
    options: Options<T> | ((lan: Language) => Options<T>);
    onChange: (value: string) => void;
    style?: Partial<Theme['dropdown']>;
    error?: boolean;
    value: string;
    disabled?: boolean;
    dropdownProps?: SemanticDropdownProps;
};
export declare const Dropdown: <TM extends TranslationGeneric>(props: Props<TM>) => JSX.Element;
export {};
