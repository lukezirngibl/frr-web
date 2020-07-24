/// <reference types="react" />
import { CSSProperties } from '@material-ui/styles';
export declare type IconProps = {
    icon: string;
    style?: CSSProperties;
    className?: string;
    size?: number;
    color?: string;
    onClick?: (e: any) => void;
};
export declare const MaterialIconFontFace: import("styled-components").GlobalStyleComponent<{}, import("styled-components").DefaultTheme>;
export declare const Icon: (props: IconProps) => JSX.Element;
