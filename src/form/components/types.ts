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
import { SingleCheckboxProps } from '../../components/SingleCheckbox'
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
import { SingleFileInputProps } from '../../components/fileUpload/SingleFileInput'
import { MultiFileInputProps } from '../../components/fileUpload/MultiFileInput'
import { LocaleNamespace, Translate } from '../../translation'
import { FC, ReactElement, ReactNode } from 'react'
import { CSSProperties } from 'styled-components'
import { FormTheme } from '../../theme/theme.form'
import { FormLens } from '../util'
import { DeepPartial } from '../../util'

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

  Button = '',
  CodeInput = 'CodeInput',
  ColorPicker = 'ColorPicker',
  CountrySelect = 'CountrySelect',
  CurrencyInput = 'CurrencyInput',
  Custom = 'Custom',
  DatePicker = 'DatePicker',
  FileInput = 'FileInput',
  FormattedDatePicker = 'FormattedDatePicker',
  FormFieldGroup = 'FormFieldGroup',
  FormFieldRepeatGroup = 'FormFieldRepeatGroup',
  FormFieldRepeatSection = 'FormFieldRepeatSection',
  FormSection = 'FormSection',
  FormSectionCard = 'FormSectionCard',
  FormText = 'FormText',
  MaskedDatePicker = 'MaskedDatePicker',
  MaskedInput = 'MaskedInput',
  MultiFileInput = 'MultiFileInput',
  MultiInput = 'MultiInput',
  AutocompleteAddress = 'AutocompleteAddress',
  MultiInputAutosuggest = 'MultiInputAutosuggest',
  MultiSelect = 'MultiSelect',
  NumberInput = 'NumberInput',
  NumberMultiSelect = 'NumberMultiSelect',
  NumberSelect = 'NumberSelect',
  OptionGroup = 'OptionGroup',
  RadioGroup = 'RadioGroup',
  SingleCheckbox = 'SingleCheckbox',
  Slider = 'Slider',
  Static = 'Static',
  Switch = 'Switch',
  TextArea = 'TextArea',
  TextInput = 'TextInput',
  TextInputAutosuggest = 'TextInputAutosuggest',
  TextInputDescription = 'TextInputDescription',
  TextNumber = 'TextNumber',
  TextSelect = 'TextSelect',
  Toggle = 'Toggle',
  YesNoOptionGroup = 'YesNoOptionGroup',
  YesNoRadioGroup = 'YesNoRadioGroup',
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
  'onChange' | 'onBlur' | 'value' | 'error' | 'required' | 'readOnly' | 'type'
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
    link?: string
  }
  _value?: P['value']
}

export type IsVisibleFn<T> = (formData: T, options: { formReadOnly: boolean }) => boolean

type NullableAndUndefinabled<T> = T | null | undefined
type NullableAndUndefinabledLens<FormData, T> =
  | FormLens<FormData, T>
  | FormLens<FormData, T | null>
  | FormLens<FormData, T | undefined>
  | FormLens<FormData, T | null | undefined>

export type FileInputField<FormData> = FormInput<
  NullableAndUndefinabled<File>,
  SingleFileInputProps,
  NullableAndUndefinabledLens<FormData, File>,
  FormFieldType.FileInput
>

export type OnChangeMulti<FormData> = (
  fields: Array<{ lens: FormLens<FormData, any>; value: any }>,
) => void

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
  MultiSelectProps<string>,
  FormLens<FormData, Array<string>>,
  FormFieldType.MultiSelect
>

export type NumberMultiSelectField<FormData> = FormInput<
  Array<number>,
  MultiSelectProps<number>,
  FormLens<FormData, Array<number>>,
  FormFieldType.NumberMultiSelect
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
  isVisible?: IsVisibleFn<FormData>
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

export type CustomField<FormData> = FormInput<
  any,
  {
    CustomComponent: FC<{
      localeNamespace?: LocaleNamespace
      onChange: (value: any) => void
      value: any
    }>
    disabled?: boolean
    label?: LabelProps
    onChange: (value: any) => void
    value: any
  },
  FormLens<FormData, any>,
  FormFieldType.Custom
>

type CommonFieldProps<FormData> = {
  isDisabled?: boolean
  isVisible?: IsVisibleFn<FormData>
  isInitialeEmptyString?: boolean
  itemStyle?: CSSProperties
  maxwidth?: number
  forceOnChange?: boolean
  renderChildren?: () => ReactNode
  required?: boolean | ((formData: FormData) => boolean)
  validate?: (value: any, data: FormData, index?: number) => null | string
}

// @ts-ignore
export const fieldMap = {
  // [FormFieldType.CheckboxGroup]: null as CheckboxGroupField<unknown>,
  // [FormFieldType.InputWithDropdown]: null as InputWithDropdownField<unknown>,
  // [FormFieldType.CountryDropdown]: null as CountryDropdownField<unknown>,
  // [FormFieldType.Dropdown]: null as DropdownField<unknown>,
  // [FormFieldType.DropdownNumber]: null as DropdownField<unknown>,

  [FormFieldType.Button]: null,
  [FormFieldType.CodeInput]: null as CodeInputField<unknown>,
  [FormFieldType.ColorPicker]: null as ColorPickerField<unknown>,
  [FormFieldType.CountrySelect]: null as CountrySelectField<unknown>,
  [FormFieldType.CurrencyInput]: null as CurrencyInputField<unknown>,
  [FormFieldType.Custom]: null as CustomField<unknown>,
  [FormFieldType.DatePicker]: null as DatePickerField<unknown>,
  [FormFieldType.FileInput]: null as FileInputField<unknown>,
  [FormFieldType.FormattedDatePicker]: null as FormattedDatePickerField<unknown>,
  [FormFieldType.FormFieldGroup]: null,
  [FormFieldType.FormFieldRepeatGroup]: null,
  [FormFieldType.FormFieldRepeatSection]: null,
  [FormFieldType.FormSection]: null,
  [FormFieldType.FormSectionCard]: null,
  [FormFieldType.FormText]: null,
  [FormFieldType.MaskedDatePicker]: null as MaskedDatePickerField<unknown>,
  [FormFieldType.MaskedInput]: null as TextInputField<unknown>,
  [FormFieldType.MultiInput]: null as MultiInputField<unknown>,
  [FormFieldType.MultiInputAutosuggest]: null as MultiInputAutosuggestField<unknown>,
  [FormFieldType.AutocompleteAddress]: null as MultiInputAutosuggestAddressField<unknown>,
  [FormFieldType.MultiSelect]: null as MultiSelectField<unknown>,
  [FormFieldType.NumberInput]: null as NumberInputField<unknown>,
  [FormFieldType.NumberSelect]: null as NumberSelectField<unknown>,
  [FormFieldType.OptionGroup]: null as OptionGroupField<unknown>,
  [FormFieldType.RadioGroup]: null as RadioGroupField<unknown>,
  [FormFieldType.SingleCheckbox]: null as SingleCheckboxField<unknown>,
  [FormFieldType.Slider]: null as SliderField<unknown>,
  [FormFieldType.Static]: null,
  [FormFieldType.Switch]: null as SwitchField<unknown>,
  [FormFieldType.TextArea]: null as TextAreaField<unknown>,
  [FormFieldType.TextInput]: null as TextInputField<unknown>,
  [FormFieldType.TextInputAutosuggest]: null as TextInputAutosuggestField<unknown>,
  [FormFieldType.TextInputDescription]: null as StaticField<unknown>,
  [FormFieldType.TextNumber]: null as TextNumberInputField<unknown>,
  [FormFieldType.TextSelect]: null as TextSelectField<unknown>,
  [FormFieldType.Toggle]: null as ToggleField<unknown>,
  [FormFieldType.YesNoOptionGroup]: null as YesNoOptionGroupField<unknown>,
  [FormFieldType.YesNoRadioGroup]: null as YesNoRadioGroupField<unknown>,
} as any

export type SingleFormField<FormData> = (
  | CodeInputField<FormData>
  | ColorPickerField<FormData>
  | CountrySelectField<FormData>
  | CurrencyInputField<FormData>
  | CustomField<FormData>
  | DatePickerField<FormData>
  | FileInputField<FormData>
  | FormattedDatePickerField<FormData>
  | MaskedDatePickerField<FormData>
  | MaskedInputField<FormData>
  | MultiFileInputField<FormData>
  | MultiSelectField<FormData>
  | NumberInputField<FormData>
  | NumberMultiSelectField<FormData>
  | NumberSelectField<FormData>
  | OptionGroupField<FormData>
  | RadioGroupField<FormData>
  | SingleCheckboxField<FormData>
  | SliderField<FormData>
  | SwitchField<FormData>
  | TextAreaField<FormData>
  | TextInputAutosuggestField<FormData>
  | TextInputField<FormData>
  | TextNumberInputField<FormData>
  | TextSelectField<FormData>
  | ToggleField<FormData>
  | YesNoOptionGroupField<FormData>
  | YesNoRadioGroupField<FormData>
) &
  CommonFieldProps<FormData>

export type MultiInputField<FormData> = {
  fields: Array<SingleFormField<FormData>>
  isVisible?: IsVisibleFn<FormData>
  itemStyle?: CSSProperties
  label?: LabelProps
  type: FormFieldType.MultiInput
  readOnlyOptions?: {
    isFullWidth?: boolean
  }
}

export type MultiInputAutosuggestField<FormData> = {
  fields: Array<TextInputAutosuggestField<FormData> & CommonFieldProps<FormData>>
  isVisible?: IsVisibleFn<FormData>
  itemStyle?: CSSProperties
  label?: LabelProps
  type: FormFieldType.MultiInputAutosuggest
  readOnlyOptions?: {
    isFullWidth?: boolean
  }
}

export type MultiInputAutosuggestAddressField<FormData> = {
  fields: Array<TextInputAutosuggestField<FormData> & CommonFieldProps<FormData>>
  isVisible?: IsVisibleFn<FormData>
  itemStyle?: CSSProperties
  label?: LabelProps
  type: FormFieldType.AutocompleteAddress
  readOnlyOptions?: {
    isFullWidth?: boolean
  }
}

export type FormFieldRow<FormData> = Array<SingleFormField<FormData>>

// export type Fields<FormData> = Array<
//   SingleFormField<FormData> | FormFieldRow<FormData>
// >

export type RepeatFormField<FormData> =
  | SingleFormField<FormData>
  | MultiInputField<FormData>
  | MultiInputAutosuggestField<FormData>
  | MultiInputAutosuggestAddressField<FormData>
  | FormFieldRow<FormData>
  | FormFieldGroup<FormData>

export type GroupField<FormData> =
  | MultiInputField<FormData>
  | MultiInputAutosuggestField<FormData>
  | MultiInputAutosuggestAddressField<FormData>
  | StaticField<FormData>
  | SingleFormField<FormData>
  | FormFieldRow<FormData>

export type FormFieldGroup<FormData> = {
  description?: string
  descriptionList?: Array<string>
  fields: Array<GroupField<FormData>>
  isVisible?: IsVisibleFn<FormData>
  style?: Partial<FormTheme['group']>
  title?: string
  type: FormFieldType.FormFieldGroup
}

export type FormFieldRepeatGroup<FormData, T extends {} = {}> = {
  lens: FormLens<FormData, Array<T>>
  title?: (params: { index: number; translate: any }) => string
  type: FormFieldType.FormFieldRepeatGroup
  fields: Array<RepeatFormField<FormData>>
  length: FormLens<FormData, number> | FormLens<FormData, number | null>
  isVisible?: IsVisibleFn<FormData>
}

export type InternalSectionField<FormData> =
  | MultiInputField<FormData>
  | MultiInputAutosuggestField<FormData>
  | MultiInputAutosuggestAddressField<FormData>
  | SingleFormField<FormData>
  | StaticField<FormData>
  | FormFieldRow<FormData>
  | FormFieldGroup<FormData>

export type SectionField<FormData> =
  | MultiInputField<FormData>
  | MultiInputAutosuggestField<FormData>
  | MultiInputAutosuggestAddressField<FormData>
  | SingleFormField<FormData>
  | StaticField<FormData>
  | FormFieldRow<FormData>
  | FormFieldGroup<FormData>
  | FormFieldRepeatGroup<FormData>

export type SectionFields<FormData> = Array<SectionField<FormData>>
export type InternalSectionFields<FormData> = Array<InternalSectionField<FormData>>

export type FormFieldRepeatSection<FormData, T extends {} = {}> = {
  fields: Array<RepeatFormField<FormData>>
  isVisible?: IsVisibleFn<FormData>
  length: FormLens<FormData, number> | FormLens<FormData, number | null>
  lens: FormLens<FormData, Array<T>>
  editLabel?: string
  onEdit?: () => void
  title?: (params: { data: FormData; index: number; translate: Translate }) => string | ReactNode
  titleCenterComponent?: (params: {
    data: FormData
    index: number
    onRemoveItem: (index: number, onChangeMulti: OnChangeMulti<FormData>) => void
  }) => FC<{ onChangeMulti?: OnChangeMulti<FormData>; readOnly: boolean }>
  type: FormFieldType.FormFieldRepeatSection
}

export enum DescriptionType {
  Error = 'Error',
  Info = 'Info',
  Success = 'Success',
  Warning = 'Warning',
}

export type FormSection<FormData> = {
  dataTestId?: string
  description?: string
  descriptionType?: DescriptionType
  fieldComponent?: ReactNode
  fields: SectionFields<FormData>
  introduction?: string
  introductionReadOnly?: string
  isVisible?: IsVisibleFn<FormData>
  isOnEditDisabled?: boolean
  editLabel?: string
  onEdit?: () => void
  style?: Partial<FormTheme['section']>
  title?: string
  titleData?: any
  type: FormFieldType.FormSection
  TitleCenterComponent?: FC<{ onChangeMulti?: OnChangeMulti<FormData>; readOnly: boolean }>
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
  | MultiInputAutosuggestAddressField<FormData>
  | FormFieldRow<FormData>
  | FormFieldGroup<FormData>
  | FormSection<FormData>
  | FormSectionCard<FormData>

export type FormField<FormData> =
  | SingleFormField<FormData>
  | StaticField<FormData>
  | MultiInputField<FormData>
  | MultiInputAutosuggestField<FormData>
  | MultiInputAutosuggestAddressField<FormData>
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
  onChangeMulti?: OnChangeMulti<FormData>
  showValidation: boolean
  style: DeepPartial<FormTheme> | undefined
}

export type FieldError = {
  error: string | null
  fieldId: string
}

export type FieldMarks = Array<{ value: number; label: string }>
