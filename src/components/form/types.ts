export enum FormFieldType {
  DatePicker = 'DatePicker',
  CheckboxGroup = 'CheckboxGroup',
  FormFieldGroup = 'FormFieldGroup',
  FormSection = 'FormSection',
  NumberInput = 'NumberInput',
  RadioGroup = 'RadioGroup',
  Dropdown = 'Dropdown',
  SingleCheckbox = 'SingleCheckbox',
  DropdownNumber = 'DropdownNumber',
  TextArea = 'TextArea',
  TextInput = 'TextInput',
  UnitInput = 'UnitInput',
  TextNumber = 'TextNumber',
  InputWithDropdown = 'InputWithDropdown',
}

export type Date = {
  day: number
  month: number
  year: number
}

export enum Orientation {
  Row = 'Row',
  Column = 'Column',
}

export enum DisplayType {
  Edit = 'Edit',
  View = 'View',
}

export type DropdownOption = {
  label: string
  value: string
}
