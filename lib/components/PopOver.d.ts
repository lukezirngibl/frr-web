import React from 'react';
import { CSSProperties } from 'styled-components';
declare type Props = {
    trigger: (props: {
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    }) => React.ReactNode;
    content: (p: {
        close: () => void;
    }) => React.ReactNode;
    style?: CSSProperties;
    popOverStyle?: CSSProperties;
};
export declare const SimplePopover: (props: Props) => JSX.Element;
export {};
