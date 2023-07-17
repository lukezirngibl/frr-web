import React from 'react'
import { CodeInput } from '../../components/CodeInput'
import { ColorPicker } from '../../components/ColorPicker'
import { CountrySelect } from '../../components/CountrySelect'
import { CurrencyInput } from '../../components/CurrencyInput'
import { DatePicker } from '../../components/DatePicker'
import { FormattedDatePicker } from '../../components/FormattedDatePicker'
import { MaskedDatePicker } from '../../components/MaskedDatePicker'
import { MaskedInput } from '../../components/MaskedInput'
import { MultiSelect } from '../../components/MultiSelect'
import { NumberInput } from '../../components/NumberInput'
import { OptionGroup } from '../../components/OptionGroup'
import { RadioGroup } from '../../components/RadioGroup'
import { Select } from '../../components/Select'
import { SingleCheckbox } from '../../components/SingleCheckbox'
import { Slider } from '../../components/Slider'
import { Switch } from '../../components/Switch'
import { TextArea } from '../../components/TextArea'
import { TextInput } from '../../components/TextInput'
import { TextInputAutosuggest } from '../../components/TextInputAutosuggest'
import { TextNumberInput } from '../../components/TextNumberInput'
import { Toggle } from '../../components/Toggle'
import { YesNoOptionGroup } from '../../components/YesNoOptionGroup'
import { YesNoRadioGroup } from '../../components/YesNoRadioGroup'
import { SingleFileInput } from '../../components/fileUpload/SingleFileInput'
import { MultiFileInput } from '../../components/fileUpload/MultiFileInput'
import { LocaleNamespace } from '../../translation'
import { FormFieldType, SingleFormField } from './types'

// import { CheckboxGroup } from '../../components/CheckboxGroup'
// import { Dropdown } from '../../components/Dropdown'
// import { DropdownNumber } from '../../components/DropdownNumber'
// import { InputWithDropdown } from '../../components/InputWithDropdown'
// import { CountryDropdown } from '../../components/CountryDropdown'

/*
 * Render field function
 */

type FieldItemProps<FormData> = {
  data: FormData
  errorLabel: string | string[]
  field: SingleFormField<FormData>
  fieldIndex: number
  hasError: boolean
  hasFocus?: boolean
  inputRef?: React.MutableRefObject<HTMLElement>
  localeNamespace?: LocaleNamespace
  onChange: (value: any) => void
  onBlur: (value: any) => void
  onFocus: () => void
}

export const Field = <FormData extends {}>({
  data,
  errorLabel,
  field,
  fieldIndex,
  hasError,
  hasFocus,
  inputRef,
  localeNamespace,
  onChange,
  onBlur,
  onFocus,
}: FieldItemProps<FormData>) => {
  const dataTestId = field.lens.id()

  let { label } = field
  if (label) {
    label = {
      error: errorLabel !== null,
      errorLabel,
      errorDataTestId: `${field.lens.id()}.error`,
      localeNamespace,
      ...label,
    }
  }

  if (field.type === FormFieldType.TextArea) {
    const { type, lens, validate, ...fieldProps } = field
    return (
      <TextArea
        {...fieldProps}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        value={lens.get(data)}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        hasFocus={hasFocus}
        error={hasError}
        label={label}
        dataTestId={dataTestId}
      />
    )
  }

  if (field.type === FormFieldType.TextInput) {
    const { type, lens, validate, required, ...fieldProps } = field
    return (
      <TextInput
        {...fieldProps}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        value={lens.get(data) || ''}
        inputRef={inputRef}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        hasFocus={hasFocus}
        error={hasError}
        label={label}
        localeNamespace={localeNamespace}
        dataTestId={dataTestId}
      />
    )
  }

  if (field.type === FormFieldType.TextInputAutosuggest) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <TextInputAutosuggest
        {...fieldProps}
        dataTestId={dataTestId}
        error={hasError}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        inputRef={inputRef}
        label={label}
        localeNamespace={localeNamespace}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        value={lens.get(data)}
      />
    )
  }

  if (field.type === FormFieldType.MaskedInput) {
    const { type, lens, validate, required, ...fieldProps } = field
    return (
      <MaskedInput
        {...fieldProps}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        value={lens.get(data) || ''}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        hasFocus={hasFocus}
        error={hasError}
        label={label}
        localeNamespace={localeNamespace}
        dataTestId={dataTestId}
      />
    )
  }

  if (field.type === FormFieldType.Toggle) {
    const { type, lens, validate, required, ...fieldProps } = field
    return (
      <Toggle
        {...fieldProps}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        value={lens.get(data)}
        onChange={onBlur}
        label={label}
        dataTestId={dataTestId}
      />
    )
  }

  if (field.type === FormFieldType.FormattedDatePicker) {
    const { type, lens, validate, required, ...fieldProps } = field
    return (
      <FormattedDatePicker
        {...fieldProps}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        hasFocus={hasFocus}
        error={hasError}
        value={lens.get(data)}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        localeNamespace={localeNamespace}
        dataTestId={dataTestId}
      />
    )
  }

  if (field.type === FormFieldType.MaskedDatePicker) {
    const { type, lens, validate, required, ...fieldProps } = field
    return (
      <MaskedDatePicker
        {...fieldProps}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        error={hasError}
        value={lens.get(data)}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        hasFocus={hasFocus}
        label={label}
        localeNamespace={localeNamespace}
        dataTestId={dataTestId}
      />
    )
  }

  if (field.type === FormFieldType.DatePicker) {
    const { type, lens, validate, required, ...fieldProps } = field
    return (
      <DatePicker
        {...fieldProps}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        value={lens.get(data)}
        hasFocus={hasFocus}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        localeNamespace={localeNamespace}
        dataTestId={dataTestId}
      />
    )
  }

  if (field.type === FormFieldType.ColorPicker) {
    const { type, lens, validate, required, ...fieldProps } = field
    return (
      <ColorPicker
        {...fieldProps}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        value={lens.get(data)}
        onChange={onBlur}
        label={label}
        localeNamespace={localeNamespace}
        dataTestId={dataTestId}
      />
    )
  }

  if (field.type === FormFieldType.CountrySelect) {
    const { type, lens, validate, required, ...fieldProps } = field
    return (
      <CountrySelect
        {...fieldProps}
        dataTestId={dataTestId}
        error={hasError}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        label={label}
        localeNamespace={localeNamespace}
        onChange={onBlur}
        onFocus={onFocus}
        value={lens.get(data)}
      />
    )
  }

  if (field.type === FormFieldType.Slider) {
    const { type, lens, validate, required, ...fieldProps } = field
    return (
      <Slider
        {...fieldProps}
        dataTestId={dataTestId}
        hasFocus={hasFocus}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        label={label}
        localeNamespace={localeNamespace}
        onChange={onBlur}
        value={lens.get(data)}
      />
    )
  }

  if (field.type === FormFieldType.YesNoOptionGroup) {
    const { lens, validate, ...fieldProps } = field
    return (
      <YesNoOptionGroup
        {...fieldProps}
        dataTestId={dataTestId}
        error={hasError}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        label={label}
        localeNamespace={localeNamespace}
        onChange={onBlur}
        onFocus={onFocus}
        hasFocus={hasFocus}
        value={lens.get(data)}
      />
    )
  }

  if (field.type === FormFieldType.YesNoRadioGroup) {
    const { lens, validate, ...fieldProps } = field
    return (
      <YesNoRadioGroup
        {...fieldProps}
        dataTestId={dataTestId}
        error={hasError}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        label={label}
        localeNamespace={localeNamespace}
        onChange={onBlur}
        onFocus={onFocus}
        hasFocus={hasFocus}
        value={lens.get(data)}
      />
    )
  }

  if (field.type === FormFieldType.OptionGroup) {
    const { lens, validate, ...fieldProps } = field
    return (
      <OptionGroup
        {...fieldProps}
        dataTestId={dataTestId}
        error={hasError}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        label={label}
        localeNamespace={localeNamespace}
        onChange={onBlur}
        onFocus={onFocus}
        hasFocus={hasFocus}
        value={lens.get(data)}
      />
    )
  }

  if (field.type === FormFieldType.RadioGroup) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <RadioGroup
        {...fieldProps}
        dataTestId={dataTestId}
        error={hasError}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        label={label}
        localeNamespace={localeNamespace}
        onChange={onBlur}
        onFocus={onFocus}
        hasFocus={hasFocus}
        value={lens.get(data)}
      />
    )
  }

  if (field.type === FormFieldType.SingleCheckbox) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <SingleCheckbox
        {...fieldProps}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        value={lens.get(data)}
        onChange={onBlur}
        error={hasError}
        label={label}
      />
    )
  }

  if (field.type === FormFieldType.CodeInput) {
    const { isAutoFocus, lens, validate, ...fieldProps } = field
    return (
      <CodeInput
        {...fieldProps}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        value={lens.get(data)}
        onChange={onBlur}
        isAutoFocus={isAutoFocus || hasFocus}
        label={label}
      />
    )
  }

  if (field.type === FormFieldType.Switch) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <Switch
        {...fieldProps}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        value={lens.get(data)}
        onChange={onBlur}
        error={hasError}
        label={label}
      />
    )
  }

  if (field.type === FormFieldType.NumberInput) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <NumberInput
        {...fieldProps}
        error={hasError}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        inputRef={inputRef}
        label={label}
        localeNamespace={localeNamespace}
        onChange={onBlur}
        onFocus={onFocus}
        onBlur={onBlur}
        hasFocus={hasFocus}
        value={lens.get(data)}
      />
    )
  }

  if (field.type === FormFieldType.TextNumber) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <TextNumberInput
        {...fieldProps}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        inputRef={inputRef}
        value={lens.get(data)}
        onChange={onBlur}
        hasFocus={hasFocus}
        // error={hasError}
        label={label}
        localeNamespace={localeNamespace}
      />
    )
  }

  if (field.type === FormFieldType.TextSelect) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <Select
        {...fieldProps}
        dataTestId={dataTestId}
        error={hasError}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        inputRef={inputRef}
        label={label}
        localeNamespace={localeNamespace}
        onBlur={onBlur}
        onChange={onBlur}
        onFocus={onFocus}
        hasFocus={hasFocus}
        value={lens.get(data)}
      />
    )
  }

  if (field.type === FormFieldType.NumberSelect) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <Select
        {...fieldProps}
        dataTestId={dataTestId}
        error={hasError}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        inputRef={inputRef}
        label={label}
        localeNamespace={localeNamespace}
        onBlur={onBlur}
        onChange={(value: any) =>
          value !== undefined && value !== null && !isNaN(value) ? onBlur(Number(value)) : onBlur(null)
        }
        onFocus={onFocus}
        hasFocus={hasFocus}
        value={lens.get(data)}
      />
    )
  }

  if (field.type === FormFieldType.MultiSelect) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <MultiSelect
        {...fieldProps}
        error={hasError}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        label={label}
        localeNamespace={localeNamespace}
        onChange={onBlur}
        value={(lens.get(data) as any).map((v) => {
          if (typeof v === 'object' && 'label' in v) return v
          else if (typeof v === 'string') return { value: v, label: v }
          else {
            return { value: (v as any).value, label: (v as any).value.toString() }
          }
        })}
      />
    )
  }

  if (field.type === FormFieldType.FileInput) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <SingleFileInput
        {...fieldProps}
        dataTestId={dataTestId}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        label={label}
        onChange={onBlur}
        value={lens.get(data)}
      />
    )
  }

  if (field.type === FormFieldType.MultiFileInput) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <MultiFileInput
        {...fieldProps}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        label={label}
        onChange={onBlur}
        value={lens.get(data)}
      />
    )
  }

  if (field.type === FormFieldType.CurrencyInput) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <CurrencyInput
        {...fieldProps}
        dataTestId={dataTestId}
        error={hasError}
        key={typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`}
        label={label}
        localeNamespace={localeNamespace}
        onBlur={onBlur}
        onChange={onBlur}
        onFocus={onFocus}
        hasFocus={hasFocus}
        value={lens.get(data)}
      />
    )
  }

  return <div />
}
