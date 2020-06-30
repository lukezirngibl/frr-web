import { Lens } from 'monocle-ts'
import React, { ReactNode, useEffect } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup'
import { NumberInput, Props as NumberInputProps } from './NumberInput'
// import { RadioGroup, RadioGroupProps } from './RadioGroup'
import { Dropdown, Props as DropdownProps } from './Dropdown'
import { SingleCheckbox, Props as SingleCheckboxProps } from './SingleCheckbox'
import { TextInput, Props as TextInputProps } from './TextInput'
import { DisplayType, FormFieldType, Date } from './types'
import { TextArea, TextAreaProps } from './TextArea'
import {
  TextNumberInput,
  Props as TextNumberInputProps,
} from './TextNumberInput'
import { DatePickerProps, DatePicker } from './DatePicker'
import { someFormFields } from './some.form'
import { TranslationGeneric } from '../../util'
import { getLanguageContext, getTranslation } from '../../theme/language'
import { getThemeContext, Theme } from '../../theme/theme'
import { createGetStyle } from '../../theme/util'
import { Button, Props as ButtonProps } from '../Button'
import { Props as DropdownNumberProps, DropdownNumber } from './DropdownNumber'
import {
  Props as InputWithDropdownProps,
  InputWithDropdown,
} from './InputWithDropdown'

type FormInput<P extends {}, L, T> = Omit<P, 'onChange' | 'value' | 'error'> & {
  lens: L
  type: T
}

export type InputWithDropdownField<FormData, TM> = FormInput<
  InputWithDropdownProps<TM>,
  Lens<FormData, string>,
  FormFieldType.InputWithDropdown
>

export type DropdownNumberField<FormData, TM> = FormInput<
  DropdownNumberProps<TM>,
  Lens<FormData, number>,
  FormFieldType.DropdownNumber
>

export type TextAreaField<FormData, TM> = FormInput<
  TextAreaProps<TM>,
  Lens<FormData, string>,
  FormFieldType.TextArea
>

export type TextNumberInputField<FormData, TM> = FormInput<
  TextNumberInputProps<TM>,
  Lens<FormData, number>,
  FormFieldType.TextNumber
>

export type TextInputField<FormData, TM> = FormInput<
  TextInputProps<TM>,
  Lens<FormData, string>,
  FormFieldType.TextInput
>

export type DatePickerField<FormData> = FormInput<
  DatePickerProps,
  Lens<FormData, string>,
  FormFieldType.DatePicker
>

export type DropdownField<FormData, TM> = FormInput<
  DropdownProps<TM>,
  Lens<FormData, string>,
  FormFieldType.Dropdown
>

// export type RadioGroupField<FormData> = FormInput<
//   RadioGroupProps,
//   Lens<FormData, string>,
//   FormFieldType.RadioGroup
// >

export type CheckboxGroupField<FormData, TM> = FormInput<
  CheckboxGroupProps<TM>,
  Lens<FormData, Array<string>>,
  FormFieldType.CheckboxGroup
>

export type NumberInputField<FormData, TM> = FormInput<
  NumberInputProps<TM>,
  Lens<FormData, number>,
  FormFieldType.NumberInput
>

export type SingleCheckboxField<FormData, TM> = FormInput<
  SingleCheckboxProps<TM>,
  Lens<FormData, boolean>,
  FormFieldType.SingleCheckbox
>

type CommonFieldProps<FormData, TM> = {
  isVisible?: (formData: FormData) => boolean
  isDisabled?: boolean
  validate?: (formData: FormData) => boolean
  maxwidth?: number
}

export type SingleFormField<FormData, TM> = (
  | CheckboxGroupField<FormData, TM>
  | NumberInputField<FormData, TM>
  | DatePickerField<FormData>
  | DropdownField<FormData, TM>
  | SingleCheckboxField<FormData, TM>
  | TextAreaField<FormData, TM>
  | TextNumberInputField<FormData, TM>
  | TextInputField<FormData, TM>
  | InputWithDropdownField<FormData, TM>
  | DropdownNumberField<FormData, TM>
) &
  CommonFieldProps<FormData, TM>

export type FormFieldRow<FormData, TM> = Array<SingleFormField<FormData, TM>>

export type Fields<FormData, TM> = Array<
  SingleFormField<FormData, TM> | FormFieldRow<FormData, TM>
>

export type SingleFieldOrRow<FormData, TM> =
  | SingleFormField<FormData, TM>
  | FormFieldRow<FormData, TM>

export type GroupFields<FormData, TM> = Array<SingleFieldOrRow<FormData, TM>>

export type FormFieldGroup<FormData, TM> = {
  title: keyof TM
  style?: CSSProperties
  type: FormFieldType.FormFieldGroup
  fields: GroupFields<FormData, TM>
}

export type FormField<FormData, TM> =
  | SingleFormField<FormData, TM>
  | FormFieldRow<FormData, TM>
  | FormFieldGroup<FormData, TM>
  | FormSection<FormData, TM>

export type SectionField<FormData, TM> =
  | SingleFormField<FormData, TM>
  | FormFieldRow<FormData, TM>
  | FormFieldGroup<FormData, TM>

export type SectionFields<FormData, TM> = Array<SectionField<FormData, TM>>

export type FormSection<FormData, TM> = {
  title?: keyof TM
  style?: CSSProperties
  type: FormFieldType.FormSection
  fields: SectionFields<FormData, TM>
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  margin-bottom: 144px;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 4px !important;
`

export const FormFieldRowWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }

  & > * {
    margin-left: 4px;
    margin-right: 4px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`

export const FormFieldWrapper = styled.div<{
  width: string
  maxwidth?: number
}>`
  position: relative;
  max-width: ${props =>
    props.maxwidth !== undefined ? `${props.maxwidth}px` : 'none'};
  width: ${props => props.width};

  @media (max-width: 768px) {
    width: 100% !important;
    margin-top: 12px;
    margin-left: 0 !important;
    margin-right: 0 !important;

    &:first-of-type {
      margin-top: 0;
    }
  }

  .ui.checkbox.error {
    label {
      color: red !important;
    }
  }

  .input {
    width: 100%;

    &.input.error {
      .label {
        background-color: red !important;
        color: white !important;
      }
    }

    .label {
      transition: all 0.7s ease;
      flex: none !important;
      width: 96px;
      font-size: 13px !important;
      line-height: 16px !important;
    }
    input {
      transition: all 0.7s ease;
      flex: none !important;
      max-width: ${props =>
        props.maxwidth !== undefined ? `${props.maxwidth}px` : 'none'};
      width: 100%;
    }
  }
`

export const FormFieldGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  flex-shrink: 0;
`

export const FormFieldGroupTitle = styled.h4`
  margin: 32px 0 12px 0;
`

export const FormSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0 8px 0;
  flex-shrink: 0;
`

export const FormSectionTitle = styled.h3`
  margin-bottom: 16px;
  font-size: 18px;
`

export type Props<FormData, TM> = {
  children?: ReactNode
  style?: Partial<Theme['form']>
  data: FormData
  display?: DisplayType
  formFields: Array<FormField<FormData, TM>>
  onSubmit?: () => void
  onChange: (formState: FormData) => void
  buttonProps?: Omit<ButtonProps<TM>, 'onClick'>
  renderTopChildren?: (f: FormData) => ReactNode
}

export const Form = <FormData extends {}, TM extends TranslationGeneric>(
  props: Props<FormData, TM>,
) => {
  // const formRef = React.createRef<HTMLFormElement>()

  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'form')(props.style)

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const [showValidation, setShowValidation] = React.useState(false)

  useEffect(() => {
    setShowValidation(false)
  }, [props.formFields])

  const isFieldInvalid = (f: SingleFormField<FormData, TM>): boolean => {
    if ('validate' in f && f.validate !== undefined) {
      return f.validate(props.data)
    }
    if ('required' in f && f.required) {
      const val = f.lens.get(props.data)
      let isInvalid = val === '' || val === null || val === undefined

      if (
        f.type === FormFieldType.NumberInput &&
        'min' in f &&
        f.min !== undefined &&
        f.min > 0
      ) {
        isInvalid = val < f.min
      }

      return isInvalid
    }
    return false
  }

  const submit = () => {
    const isNotValid = someFormFields(props.formFields, isFieldInvalid)

    if (isNotValid) {
      setShowValidation(true)
    } else if (typeof props.onSubmit === 'function') {
      props.onSubmit()
    }
  }

  const renderFormFieldInput = (field: SingleFormField<FormData, TM>) => {
    const { data, onChange } = props

    const hasError = showValidation && isFieldInvalid(field)

    if (field.type === FormFieldType.TextArea) {
      const { type, lens, ...fieldProps } = field
      return (
        <TextArea
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
        />
      )
    }

    if (field.type === FormFieldType.TextInput) {
      const { type, lens, ...fieldProps } = field
      return (
        <TextInput
          {...fieldProps}
          value={lens.get(data) || ''}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
        />
      )
    }

    if (field.type === FormFieldType.DatePicker) {
      const { type, lens, ...fieldProps } = field
      return (
        <DatePicker
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
        />
      )
    }

    if (field.type === FormFieldType.CheckboxGroup) {
      const { lens, ...fieldProps } = field
      return (
        <CheckboxGroup
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
        />
      )
    }

    if (field.type === FormFieldType.SingleCheckbox) {
      const { lens, ...fieldProps } = field
      return (
        <SingleCheckbox
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
        />
      )
    }

    // if (field.type === FormFieldType.RadioGroup) {
    //   const { lens, ...fieldProps } = field
    //   return (
    //     <RadioGroup
    //       {...fieldProps}
    //       value={lens.get(data)}
    //       onChange={value => onChange(lens.set(value)(data))}
    //       error={hasError}
    //     />
    //   )
    // }

    if (field.type === FormFieldType.NumberInput) {
      const { lens, ...fieldProps } = field
      return (
        <NumberInput
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
        />
      )
    }

    if (field.type === FormFieldType.TextNumber) {
      const { lens, ...fieldProps } = field
      return (
        <TextNumberInput
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
        />
      )
    }

    if (field.type === FormFieldType.InputWithDropdown) {
      const { lens, ...fieldProps } = field
      return (
        <InputWithDropdown
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
        />
      )
    }

    if (field.type === FormFieldType.Dropdown) {
      const { lens, ...fieldProps } = field
      return (
        <Dropdown
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
        />
      )
    }

    if (field.type === FormFieldType.DropdownNumber) {
      const { lens, ...fieldProps } = field
      return (
        <DropdownNumber
          {...fieldProps}
          value={lens.get(data)}
          onChange={value => onChange(lens.set(value)(data))}
          error={hasError}
        />
      )
    }

    return <div />
  }

  const renderFormFieldItem = (width: number = 100) => (
    field: SingleFormField<FormData, TM>,
    key: number,
  ) => (
    <FormFieldWrapper
      key={key}
      width={`calc(${width}% - ${width === 100 ? 0 : 4}px)`}
      maxwidth={field.maxwidth}
      className="form-field"
    >
      {renderFormFieldInput(field)}
    </FormFieldWrapper>
  )

  const renderFormFieldRow = (
    formFieldRow: FormFieldRow<FormData, TM>,
    key: number,
  ) => (
    <FormFieldRowWrapper key={key}>
      {formFieldRow.map(renderFormFieldItem((1 / formFieldRow.length) * 100))}
    </FormFieldRowWrapper>
  )

  const renderFormField = (
    formField: FormFieldRow<FormData, TM> | SingleFormField<FormData, TM>,
    key: number,
  ) => {
    if (Array.isArray(formField)) {
      return renderFormFieldRow(formField, key)
    } else {
      return (
        <FormFieldRowWrapper>
          {renderFormFieldItem()(formField, key)}
        </FormFieldRowWrapper>
      )
    }
  }

  const renderFormSectionItem = (
    formField: SectionField<FormData, TM>,
    key: number,
  ) => {
    if (
      !Array.isArray(formField) &&
      formField.type === FormFieldType.FormFieldGroup
    ) {
      return renderFormGroup(formField, key)
    } else {
      return renderFormField(formField, key)
    }
  }

  const renderFormGroup = (
    formGroup: FormFieldGroup<FormData, TM>,
    key: number,
  ) => (
    <FormFieldGroupWrapper key={key} style={formGroup.style}>
      <FormFieldGroupTitle style={getStyle('groupTitle')}>
        {translate(formGroup.title)}
      </FormFieldGroupTitle>
      {formGroup.fields.map(renderFormField)}
    </FormFieldGroupWrapper>
  )

  const renderFormSection = (
    formSection: FormSection<FormData, TM>,
    key: number,
  ) => (
    <FormSectionWrapper key={key} style={formSection.style}>
      <FormSectionTitle style={getStyle('sectionTitle')}>
        {translate(formSection.title)}
      </FormSectionTitle>
      {formSection.fields.map(renderFormSectionItem)}
    </FormSectionWrapper>
  )

  const { formFields } = props
  return (
    <FormWrapper style={getStyle('wrapper')}>
      {props.renderTopChildren && props.renderTopChildren(props.data)}
      <FormContent>
        {formFields.map((f: FormField<FormData, TM>, key: number) => {
          if (Array.isArray(f)) {
            return renderFormFieldRow(f, key)
          } else if (f.type === FormFieldType.FormFieldGroup) {
            return renderFormGroup(f, key)
          } else if (f.type === FormFieldType.FormSection) {
            return renderFormSection(f, key)
          } else {
            return renderFormField(f, key)
          }
        })}
      </FormContent>
      {props.buttonProps && (
        <ButtonContainer>
          <Button<TM>
            {...props.buttonProps}
            onClick={() => {
              submit()
            }}
          />
        </ButtonContainer>
      )}
    </FormWrapper>
  )
}
