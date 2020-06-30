import * as React from 'react';
import { CSSProperties } from 'styled-components';
export declare type Theme = {
    button: {
        chromeless: CSSProperties;
        primary: CSSProperties;
        secondary: CSSProperties;
        common: CSSProperties;
    };
    form: {
        label: CSSProperties;
        groupTitle: CSSProperties;
        sectionTitle: CSSProperties;
        wrapper: CSSProperties;
    };
    dropdown: {
        wrapper: CSSProperties;
    };
};
export declare type AppTheme = {
    [k in keyof Theme]?: Partial<Theme[k]>;
};
export declare const configureTheme: (userTheme: AppTheme) => React.Context<Theme>;
export declare const getThemeContext: () => React.Context<Theme>;
export declare const getTheme: () => Theme;
