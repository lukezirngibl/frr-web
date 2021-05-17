import { CodeInput } from '../../components/CodeInput'
import { CountrySelect } from '../../components/CountrySelect'
import { CurrencyInput } from '../../components/CurrencyInput'
import { DatePicker } from '../../components/DatePicker'
import { FormattedDatePicker } from '../../components/FormattedDatePicker'
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
import { TextNumberInput } from '../../components/TextNumberInput'
import { Toggle } from '../../components/Toggle'
import { YesNoOptionGroup } from '../../components/YesNoOptionGroup'
import { YesNoRadioGroup } from '../../components/YesNoRadioGroup'
import { LocaleNamespace } from '../../translation'
import React from 'react'
import { FormFieldType, SingleFormField } from './types'
import { FileInput } from '../../components/FileInput'

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
  localeNamespace?: LocaleNamespace
  onChange: (value: any) => void
  onBlur: (value: any) => void
}

export const Field = <FormData extends {}>({
  data,
  errorLabel,
  field,
  fieldIndex,
  hasError,
  hasFocus,
  localeNamespace,
  onChange,
  onBlur,
}: FieldItemProps<FormData>) => {
  const dataTestId = field.lens.id()

  let { label } = field
  if (label) {
    label = {
      error: errorLabel !== null,
      errorLabel,
      localeNamespace,
      ...label,
    }
  }

  if (field.type === FormFieldType.TextArea) {
    const { type, lens, validate, ...fieldProps } = field
    return (
      <TextArea
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onChange}
        onBlur={onBlur}
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
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data) || ''}
        onChange={onChange}
        onBlur={onBlur}
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
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
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
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
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

  if (field.type === FormFieldType.DatePicker) {
    const { type, lens, validate, required, ...fieldProps } = field
    return (
      <DatePicker
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
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

  if (field.type === FormFieldType.CountrySelect) {
    const { type, lens, validate, required, ...fieldProps } = field
    return (
      <CountrySelect
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        error={hasError}
        label={label}
        localeNamespace={localeNamespace}
        dataTestId={dataTestId}
      />
    )
  }

  if (field.type === FormFieldType.Slider) {
    const { type, lens, validate, required, ...fieldProps } = field
    return (
      <Slider
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        dataTestId={dataTestId}
        label={label}
      />
    )
  }

  if (field.type === FormFieldType.YesNoOptionGroup) {
    const { lens, validate, ...fieldProps } = field
    return (
      <YesNoOptionGroup
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        label={label}
        dataTestId={dataTestId}
        error={hasError}
      />
    )
  }

  if (field.type === FormFieldType.YesNoRadioGroup) {
    const { lens, validate, ...fieldProps } = field
    return (
      <YesNoRadioGroup
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        label={label}
        dataTestId={dataTestId}
        error={hasError}
      />
    )
  }

  if (field.type === FormFieldType.OptionGroup) {
    const { lens, validate, ...fieldProps } = field
    return (
      <OptionGroup
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        label={label}
        error={hasError}
        dataTestId={dataTestId}
      />
    )
  }

  if (field.type === FormFieldType.RadioGroup) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <RadioGroup
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        label={label}
        error={hasError}
        dataTestId={dataTestId}
      />
    )
  }

  if (field.type === FormFieldType.SingleCheckbox) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <SingleCheckbox
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        error={hasError}
        label={label}
      />
    )
  }

  if (field.type === FormFieldType.CodeInput) {
    const { lens, validate, ...fieldProps } = field
    return (
      <CodeInput
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        label={label}
      />
    )
  }

  if (field.type === FormFieldType.Switch) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <Switch
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
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
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        error={hasError}
        label={label}
      />
    )
  }

  if (field.type === FormFieldType.TextNumber) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <TextNumberInput
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
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
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        label={label}
        localeNamespace={localeNamespace}
        error={hasError}
        dataTestId={dataTestId}
      />
    )
  }

  if (field.type === FormFieldType.NumberSelect) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <Select
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        label={label}
        localeNamespace={localeNamespace}
        error={hasError}
        dataTestId={dataTestId}
      />
    )
  }

  if (field.type === FormFieldType.MultiSelect) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <MultiSelect
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        error={hasError}
        label={label}
        localeNamespace={localeNamespace}
      />
    )
  }

  if (field.type === FormFieldType.FileInput) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <FileInput
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        label={label}
      />
    )
  }

  if (field.type === FormFieldType.CurrencyInput) {
    const { lens, validate, required, ...fieldProps } = field
    return (
      <CurrencyInput
        {...fieldProps}
        key={
          typeof fieldIndex === 'string' ? fieldIndex : `field-${fieldIndex}`
        }
        value={lens.get(data)}
        onChange={onBlur}
        error={hasError}
        label={label}
        localeNamespace={localeNamespace}
        dataTestId={dataTestId}
      />
    )
  }

  return <div />
}