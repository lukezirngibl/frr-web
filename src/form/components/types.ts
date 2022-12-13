import { Props as CodeInputProps } from '../../components/CodeInput'
import { Props as CountrySelectProps } from '../../components/CountrySelect'
import { Props as CurrencyInputProps } from '../../components/CurrencyInput'
import { Props as ColorPickerProps } from '../../components/ColorPicker'
import { Props as DatePickerProps } from '../../components/DatePicker'
import { Props as FormattedDatePickerProps } from '../../components/FormattedDatePicker'
import { LabelProps } from '../../components/Label'
import { Props as MultiSelectProps } from '../../components/MultiSelect'
import { Props as NumberInputProps } from '../../components/NumberInput'
import { Props as OptionGroupProps } from '../../components/OptionGroup'
import { Props as RadioGroupProps } from '../../components/RadioGroup'
import { Props as SelectProps } from '../../components/Select'
import { Props as SingleCheckboxProps } from '../../components/SingleCheckbox'
import { Props as SliderProps } from '../../components/Slider'
import { Props as SwithProps } from '../../components/Switch'
import { Props as TextProps } from '../../components/Text'
import { TextAreaProps } from '../../components/TextArea'
import { Props as TextInputProps } from '../../components/TextInput'
import { Props as TextInputAutosuggestProps, Suggestions } from '../../components/TextInputAutosuggest'
import { Props as MaskedDatePickerProps } from '../../components/MaskedDatePicker'
import { Props as MaskedInputProps } from '../../components/MaskedInput'
import { Props as StaticFieldProps } from './StaticField'
import { Props as TextNumberInputProps } from '../../components/TextNumberInput'
import { Props as ToggleProps } from '../../components/Toggle'
import { Props as YesNoOptionGroupProps } from '../../components/YesNoOptionGroup'
import { Props as YesNoRadioGroupProps } from '../../components/YesNoRadioGroup'
import { Props as FileInputProps } from '../../components/FileInput'
import { Props as MultiFileInputProps } from '../../components/MultiFileInput'
import { LocaleNamespace, Translate } from '../../translation'
import { ReactNode } from 'react'
import { CSSProperties } from 'styled-components'
import { FormTheme } from '../../theme/theme.form'
import { FormLens } from '../util'

// import { CheckboxGroupProps } from '../../components/CheckboxGroup'
// import { Props as DropdownProps } from '../../components/Dropdown'
// import { Props as DropdownNumberProps } from '../../components/DropdownNumber'
// import { Props as InputWithDropdownProps } from '../../components/InputWithDropdown'
// import { Props as CountryDropdownProps } from '../../components/CountryDropdown'

export enum FormFieldType {
  // CountryDropdown = 'CountryDropdown',
  // CheckboxGroup = 'CheckboxGroup',
  // Dropdown = 'Dropdown',
  // DropdownNumber = 'DropdownNumber',
  // InputWithDropdown = 'InputWithDropdown',

  CodeInput = 'CodeInput',
  CountrySelect = 'CountrySelect',
  CurrencyInput = 'CurrencyInput',
  ColorPicker = 'ColorPicker',
  DatePicker = 'DatePicker',
  FormattedDatePicker = 'FormattedDatePicker',
  FormFieldGroup = 'FormFieldGroup',
  FormFieldRepeatGroup = 'FormFieldRepeatGroup',
  FormFieldRepeatSection = 'FormFieldRepeatSection',
  FormSection = 'FormSection',
  FormSectionCard = 'FormSectionCard',
  FormText = 'FormText',
  MaskedDatePicker = 'MaskedDatePicker',
  MaskedInput = 'MaskedInput',
  MultiSelect = 'MultiSelect',
  MultiInput = 'MultiInput',
  MultiInputAutosuggest = 'MultiInputAutosuggest',
  NumberInput = 'NumberInput',
  NumberSelect = 'NumberSelect',
  OptionGroup = 'OptionGroup',
  RadioGroup = 'RadioGroup',
  SingleCheckbox = 'SingleCheckbox',
  Button = '',
  Slider = 'Slider',
  Switch = 'Switch',
  TextArea = 'TextArea',
  TextInput = 'TextInput',
  TextInputDescription = 'TextInputDescription',
  TextNumber = 'TextNumber',
  TextSelect = 'TextSelect',
  TextInputAutosuggest = 'TextInputAutosuggest',
  Toggle = 'Toggle',
  YesNoOptionGroup = 'YesNoOptionGroup',
  YesNoRadioGroup = 'YesNoRadioGroup',
  Static = 'Static',
  FileInput = 'FileInput',
  MultiFileInput = 'MultiFileInput',
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

type FormInput<V, P extends { value: V }, L, T> = Omit<
  P,
  'onChange' | 'onBlur' | 'value' | 'error' | 'required'
> & {
  lens: L
  type: T
  readOnly?: boolean
  readOnlyMapper?: (
    params: Omit<P, 'onChange' | 'onBlur'> & {
      translate: Translate
    },
  ) => string | ReactNode
  readOnlyOptions?: {
    isHighlighted?: boolean
    isFullWidth?: boolean
    image?: string
  }
  _value?: P['value']
}

type NullableAndUndefinabled<T> = T | null | undefined
type NullableAndUndefinabledLens<FormData, T> =
  | FormLens<FormData, T>
  | FormLens<FormData, T | null>
  | FormLens<FormData, T | undefined>
  | FormLens<FormData, T | null | undefined>

export type FileInputField<FormData> = FormInput<
  NullableAndUndefinabled<File>,
  FileInputProps,
  NullableAndUndefinabledLens<FormData, File>,
  FormFieldType.FileInput
>

export type MultiFileInputField<FormData> = FormInput<
  NullableAndUndefinabled<Array<File>>,
  MultiFileInputProps,
  NullableAndUndefinabledLens<FormData, Array<File>>,
  FormFieldType.MultiFileInput
>

export type FormTextField<FormData> = FormInput<
  string,
  TextProps,
  FormLens<FormData, string>,
  FormFieldType.FormText
>

export type OptionGroupField<FormData> = FormInput<
  NullableAndUndefinabled<string> | NullableAndUndefinabled<number>,
  OptionGroupProps,
  NullableAndUndefinabledLens<FormData, string> | NullableAndUndefinabledLens<FormData, number>,
  FormFieldType.OptionGroup
>

export type SliderField<FormData> = FormInput<
  NullableAndUndefinabled<number>,
  SliderProps,
  NullableAndUndefinabledLens<FormData, number>,
  FormFieldType.Slider
>

export type ToggleField<FormData> = FormInput<
  NullableAndUndefinabled<boolean>,
  ToggleProps,
  NullableAndUndefinabledLens<FormData, boolean>,
  FormFieldType.Toggle
>

export type RadioGroupField<FormData> = FormInput<
  NullableAndUndefinabled<string>,
  RadioGroupProps,
  NullableAndUndefinabledLens<FormData, string>,
  FormFieldType.RadioGroup
>

export type CodeInputField<FormData> = FormInput<
  NullableAndUndefinabled<string>,
  CodeInputProps,
  NullableAndUndefinabledLens<FormData, string>,
  FormFieldType.CodeInput
>

export type CurrencyInputField<FormData> = FormInput<
  NullableAndUndefinabled<number>,
  CurrencyInputProps,
  NullableAndUndefinabledLens<FormData, number>,
  FormFieldType.CurrencyInput
>

export type MultiSelectField<FormData> = FormInput<
  Array<string>,
  MultiSelectProps,
  FormLens<FormData, Array<string>>,
  FormFieldType.MultiSelect
>

export type NumberSelectField<FormData> = FormInput<
  NullableAndUndefinabled<number> | NullableAndUndefinabled<string>,
  SelectProps,
  NullableAndUndefinabledLens<FormData, string> | NullableAndUndefinabledLens<FormData, number>,
  FormFieldType.NumberSelect
>

export type SwitchField<FormData> = FormInput<
  boolean | null,
  SwithProps,
  FormLens<FormData, boolean>,
  FormFieldType.Switch
>

export type CountrySelectField<FormData> = FormInput<
  NullableAndUndefinabled<number> | NullableAndUndefinabled<string>,
  CountrySelectProps,
  NullableAndUndefinabledLens<FormData, string> | NullableAndUndefinabledLens<FormData, number>,
  FormFieldType.CountrySelect
>

export type TextAreaField<FormData> = FormInput<
  NullableAndUndefinabled<string>,
  TextAreaProps,
  NullableAndUndefinabledLens<FormData, string>,
  FormFieldType.TextArea
>

export type TextNumberInputField<FormData> = FormInput<
  NullableAndUndefinabled<number>,
  TextNumberInputProps,
  NullableAndUndefinabledLens<FormData, number>,
  FormFieldType.TextNumber
>

export type TextInputField<FormData> = FormInput<
  NullableAndUndefinabled<string>,
  TextInputProps,
  NullableAndUndefinabledLens<FormData, string>,
  FormFieldType.TextInput
>

export type TextInputAutosuggestField<FormData> = FormInput<
  NullableAndUndefinabled<string>,
  TextInputAutosuggestProps,
  NullableAndUndefinabledLens<FormData, string>,
  FormFieldType.TextInputAutosuggest
>
export type TextInputSuggestions = Suggestions

export type TextSelectField<FormData> = FormInput<
  NullableAndUndefinabled<string> | NullableAndUndefinabled<number>,
  SelectProps,
  NullableAndUndefinabledLens<FormData, string> | NullableAndUndefinabledLens<FormData, number>,
  FormFieldType.TextSelect
>

export type MaskedInputField<FormData> = FormInput<
  NullableAndUndefinabled<string>,
  MaskedInputProps,
  NullableAndUndefinabledLens<FormData, string>,
  FormFieldType.MaskedInput
>

export type StaticField<FormData> = StaticFieldProps & {
  type: FormFieldType.Static
  isVisible?: (formData: FormData) => boolean
}

export type YesNoOptionGroupField<FormData> = FormInput<
  NullableAndUndefinabled<boolean>,
  YesNoOptionGroupProps,
  NullableAndUndefinabledLens<FormData, boolean>,
  FormFieldType.YesNoOptionGroup
>

export type YesNoRadioGroupField<FormData> = FormInput<
  NullableAndUndefinabled<boolean>,
  YesNoRadioGroupProps,
  NullableAndUndefinabledLens<FormData, boolean>,
  FormFieldType.YesNoRadioGroup
>

export type ColorPickerField<FormData> = FormInput<
  NullableAndUndefinabled<string>,
  ColorPickerProps,
  NullableAndUndefinabledLens<FormData, string>,
  FormFieldType.ColorPicker
>

export type DatePickerField<FormData> = FormInput<
  NullableAndUndefinabled<Date>,
  DatePickerProps,
  NullableAndUndefinabledLens<FormData, Date>,
  FormFieldType.DatePicker
>

export type FormattedDatePickerField<FormData> = FormInput<
  NullableAndUndefinabled<string>,
  FormattedDatePickerProps,
  NullableAndUndefinabledLens<FormData, string>,
  FormFieldType.FormattedDatePicker
>

export type MaskedDatePickerField<FormData> = FormInput<
  NullableAndUndefinabled<string>,
  MaskedDatePickerProps,
  NullableAndUndefinabledLens<FormData, string>,
  FormFieldType.MaskedDatePicker
>

export type NumberInputField<FormData> = FormInput<
  NullableAndUndefinabled<number>,
  NumberInputProps,
  NullableAndUndefinabledLens<FormData, number>,
  FormFieldType.NumberInput
>

export type SingleCheckboxField<FormData> = FormInput<
  boolean,
  SingleCheckboxProps,
  FormLens<FormData, boolean>,
  FormFieldType.SingleCheckbox
>

type CommonFieldProps<FormData> = {
  isDisabled?: boolean
  isVisible?: (formData: FormData) => boolean
  itemStyle?: CSSProperties
  maxwidth?: number
  renderChildren?: () => ReactNode
  required?: boolean | ((formData: FormData) => boolean)
  validate?: (value: any) => null | string
}

// @ts-ignore
export const fieldMap = {
  // [FormFieldType.CheckboxGroup]: null as CheckboxGroupField<unknown>,
  // [FormFieldType.InputWithDropdown]: null as InputWithDropdownField<unknown>,
  // [FormFieldType.CountryDropdown]: null as CountryDropdownField<unknown>,
  // [FormFieldType.Dropdown]: null as DropdownField<unknown>,
  // [FormFieldType.DropdownNumber]: null as DropdownField<unknown>,

  [FormFieldType.FileInput]: null as FileInputField<unknown>,
  [FormFieldType.CodeInput]: null as CodeInputField<unknown>,
  [FormFieldType.CountrySelect]: null as CountrySelectField<unknown>,
  [FormFieldType.CurrencyInput]: null as CurrencyInputField<unknown>,
  [FormFieldType.ColorPicker]: null as ColorPickerField<unknown>,
  [FormFieldType.DatePicker]: null as DatePickerField<unknown>,
  [FormFieldType.FormattedDatePicker]: null as FormattedDatePickerField<unknown>,
  [FormFieldType.FormFieldGroup]: null,
  [FormFieldType.FormFieldRepeatGroup]: null,
  [FormFieldType.FormFieldRepeatSection]: null,
  [FormFieldType.FormSection]: null,
  [FormFieldType.FormSectionCard]: null,
  [FormFieldType.FormText]: null,
  [FormFieldType.Static]: null,
  [FormFieldType.Button]: null,
  [FormFieldType.MaskedDatePicker]: null as MaskedDatePickerField<unknown>,
  [FormFieldType.MaskedInput]: null as TextInputField<unknown>,
  [FormFieldType.MultiSelect]: null as MultiSelectField<unknown>,
  [FormFieldType.MultiInput]: null as MultiInputField<unknown>,
  [FormFieldType.MultiInputAutosuggest]: null as MultiInputAutosuggestField<unknown>,
  [FormFieldType.NumberInput]: null as NumberInputField<unknown>,
  [FormFieldType.NumberSelect]: null as NumberSelectField<unknown>,
  [FormFieldType.OptionGroup]: null as OptionGroupField<unknown>,
  [FormFieldType.RadioGroup]: null as RadioGroupField<unknown>,
  [FormFieldType.SingleCheckbox]: null as SingleCheckboxField<unknown>,
  [FormFieldType.Slider]: null as SliderField<unknown>,
  [FormFieldType.Switch]: null as SwitchField<unknown>,
  [FormFieldType.TextArea]: null as TextAreaField<unknown>,
  [FormFieldType.TextInput]: null as TextInputField<unknown>,
  [FormFieldType.TextInputDescription]: null as StaticField<unknown>,
  [FormFieldType.TextNumber]: null as TextNumberInputField<unknown>,
  [FormFieldType.TextSelect]: null as TextSelectField<unknown>,
  [FormFieldType.TextInputAutosuggest]: null as TextInputAutosuggestField<unknown>,
  [FormFieldType.Toggle]: null as ToggleField<unknown>,
  [FormFieldType.YesNoOptionGroup]: null as YesNoOptionGroupField<unknown>,
  [FormFieldType.YesNoRadioGroup]: null as YesNoRadioGroupField<unknown>,
} as any

export type SingleFormField<FormData> = (
  | FileInputField<FormData>
  | MultiFileInputField<FormData>
  | CodeInputField<FormData>
  | CountrySelectField<FormData>
  | CurrencyInputField<FormData>
  | ColorPickerField<FormData>
  | DatePickerField<FormData>
  | FormattedDatePickerField<FormData>
  | MaskedDatePickerField<FormData>
  | MaskedInputField<FormData>
  | MultiSelectField<FormData>
  | NumberInputField<FormData>
  | NumberSelectField<FormData>
  | OptionGroupField<FormData>
  | RadioGroupField<FormData>
  | SingleCheckboxField<FormData>
  | SliderField<FormData>
  | SwitchField<FormData>
  | TextAreaField<FormData>
  | TextInputField<FormData>
  | TextNumberInputField<FormData>
  | TextSelectField<FormData>
  | TextInputAutosuggestField<FormData>
  | ToggleField<FormData>
  | YesNoOptionGroupField<FormData>
  | YesNoRadioGroupField<FormData>
) &
  CommonFieldProps<FormData>

export type MultiInputField<FormData> = {
  fields: Array<SingleFormField<FormData>>
  isVisible?: (formData: FormData) => boolean
  itemStyle?: CSSProperties
  label?: LabelProps
  type: FormFieldType.MultiInput
  readOnlyOptions?: {
    isFullWidth?: boolean
  }
}

export type MultiInputAutosuggestField<FormData> = {
  fields: Array<TextInputAutosuggestField<FormData> & CommonFieldProps<FormData>>
  isVisible?: (formData: FormData) => boolean
  itemStyle?: CSSProperties
  label?: LabelProps
  type: FormFieldType.MultiInputAutosuggest
  readOnlyOptions?: {
    isFullWidth?: boolean
  }
}

export type FormFieldRow<FormData> = Array<SingleFormField<FormData>>

// export type Fields<FormData> = Array<
//   SingleFormField<FormData> | FormFieldRow<FormData>
// >

export type SingleFieldOrRow<FormData> =
  | SingleFormField<FormData>
  | MultiInputField<FormData>
  | MultiInputAutosuggestField<FormData>
  | FormFieldRow<FormData>

export type GroupField<FormData> =
  | MultiInputField<FormData>
  | MultiInputAutosuggestField<FormData>
  | StaticField<FormData>
  | SingleFormField<FormData>
  | FormFieldRow<FormData>

export type FormFieldGroup<FormData> = {
  description?: string
  descriptionList?: Array<string>
  fields: Array<GroupField<FormData>>
  isVisible?: (formData: FormData) => boolean
  style?: Partial<FormTheme['group']>
  title?: string
  type: FormFieldType.FormFieldGroup
}

export type FormFieldRepeatGroup<FormData, T extends {} = {}> = {
  lens: FormLens<FormData, Array<T>>
  title?: (params: { index: number; translate: any }) => string
  type: FormFieldType.FormFieldRepeatGroup
  fields: Array<SingleFieldOrRow<FormData>>
  length: FormLens<FormData, number> | FormLens<FormData, number | null>
  isVisible?: (formData: FormData) => boolean
}

export type InternalSectionField<FormData> =
  | MultiInputField<FormData>
  | MultiInputAutosuggestField<FormData>
  | SingleFormField<FormData>
  | StaticField<FormData>
  | FormFieldRow<FormData>
  | FormFieldGroup<FormData>

export type SectionField<FormData> =
  | MultiInputField<FormData>
  | MultiInputAutosuggestField<FormData>
  | SingleFormField<FormData>
  | StaticField<FormData>
  | FormFieldRow<FormData>
  | FormFieldGroup<FormData>
  | FormFieldRepeatGroup<FormData>

export type SectionFields<FormData> = Array<SectionField<FormData>> 
export type InternalSectionFields<FormData> = Array<InternalSectionField<FormData>>

export type FormFieldRepeatSection<FormData, T extends {} = {}> = {
  fields: Array<SingleFieldOrRow<FormData>>
  isVisible?: (formData: FormData) => boolean
  length: FormLens<FormData, number> | FormLens<FormData, number | null>
  lens: FormLens<FormData, Array<T>>
  editLabel?: string
  onEdit?: () => void
  title?: (params: { index: number; translate: Translate }) => string
  type: FormFieldType.FormFieldRepeatSection
}

export type FormSection<FormData> = {
  dataTestId?: string
  description?: string
  fieldComponent?: ReactNode
  fields: SectionFields<FormData>
  introduction?: string
  introductionReadOnly?: string
  isVisible?: (formData: FormData) => boolean
  isOnEditDisabled?: boolean
  editLabel?: string
  onEdit?: () => void
  style?: Partial<FormTheme['section']>
  title?: string
  titleData?: any
  type: FormFieldType.FormSection
  TitleCenterComponent?: ReactNode
}

export type FormSectionCard<FormData> = {
  dataTestId?: string
  description?: string
  fields: SectionFields<FormData>
  introduction?: string
  style?: Partial<FormTheme['section']>
  title?: string
  titleData?: any
  type: FormFieldType.FormSectionCard
}

export type InternalFormField<FormData> =
  | SingleFormField<FormData>
  | StaticField<FormData>
  | MultiInputField<FormData>
  | MultiInputAutosuggestField<FormData>
  | FormFieldRow<FormData>
  | FormFieldGroup<FormData>
  | FormSection<FormData>
  | FormSectionCard<FormData>

export type FormField<FormData> =
  | SingleFormField<FormData>
  | StaticField<FormData>
  | MultiInputField<FormData>
  | MultiInputAutosuggestField<FormData>
  | FormFieldRow<FormData>
  | FormFieldGroup<FormData>
  | FormSection<FormData>
  | FormSectionCard<FormData>
  | FormFieldRepeatGroup<FormData>
  | FormFieldRepeatSection<FormData>

export type CommonThreadProps<FormData> = {
  autoFocus: boolean
  data: FormData
  errorFieldId?: string
  fieldIndex: number
  formReadOnly: boolean
  localeNamespace?: LocaleNamespace
  onChange: (lens: FormLens<FormData, any>, value: any) => void
  onChangeMulti?: (fields: Array<{ lens: FormLens<FormData, any>; value: any }>) => void
  showValidation: boolean
  style: Partial<FormTheme> | undefined
}

export type FieldError = {
  error: string | null
  fieldId: string
}
