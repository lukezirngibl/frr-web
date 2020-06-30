import { Component } from 'react';
import { SimpleInterpolation } from 'styled-components';
import { DisplayType, Orientation } from './types';
export declare type RadioGroupProps = {
    onChange: (value: string) => void;
    value: string;
    label?: string;
    options: Array<any>;
    cssOverrides?: SimpleInterpolation;
    orientation?: Orientation;
    required?: boolean;
    error: boolean;
    display?: DisplayType;
};
export declare class RadioGroup extends Component<RadioGroupProps> {
    static defaultProps: {
        display: DisplayType;
    };
    onChange: (key: string) => (bool: boolean) => void;
    isChecked: (key: string) => boolean;
    render(): JSX.Element;
}
