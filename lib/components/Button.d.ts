/// <reference types="react" />
import { CSSProperties } from 'styled-components';
import { Theme } from '../theme/theme';
import { TranslationGeneric } from '../util';
import { IconProps } from './Icon';
export declare enum ButtonType {
    Secondary = "Secondary",
    Chromeless = "Chromeless",
    Primary = "Primary"
}
export declare type Props<T> = {
    label: keyof T;
    onClick?: () => void;
    disabled?: boolean;
    style?: Partial<Theme['button']>;
    override?: CSSProperties;
    type?: ButtonType;
    icon?: IconProps;
};
export declare const Button: <T extends TranslationGeneric>(props: Props<T>) => JSX.Element;
