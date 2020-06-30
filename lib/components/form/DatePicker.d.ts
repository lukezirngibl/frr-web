import { Component } from 'react';
import { StrictInputProps } from 'semantic-ui-react';
export declare type DatePickerProps = {
    onChange: (value: string) => void;
    value?: string;
    required?: boolean;
    error: boolean;
    label: string;
} & Omit<StrictInputProps, 'onChange' | 'type' | 'value' | 'label'>;
export declare class DatePicker extends Component<DatePickerProps, {
    hide: boolean;
}> {
    render(): JSX.Element;
}
