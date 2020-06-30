export declare enum FormFieldType {
    DatePicker = "DatePicker",
    CheckboxGroup = "CheckboxGroup",
    FormFieldGroup = "FormFieldGroup",
    FormSection = "FormSection",
    NumberInput = "NumberInput",
    RadioGroup = "RadioGroup",
    Dropdown = "Dropdown",
    SingleCheckbox = "SingleCheckbox",
    DropdownNumber = "DropdownNumber",
    TextArea = "TextArea",
    TextInput = "TextInput",
    UnitInput = "UnitInput",
    TextNumber = "TextNumber",
    InputWithDropdown = "InputWithDropdown"
}
export declare type Date = {
    day: number;
    month: number;
    year: number;
};
export declare enum Orientation {
    Row = "Row",
    Column = "Column"
}
export declare enum DisplayType {
    Edit = "Edit",
    View = "View"
}
export declare type DropdownOption = {
    label: string;
    value: string;
};
