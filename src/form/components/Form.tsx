import React, { FormEvent, ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FormTheme, useCSSStyles, useFormTheme } from '../../theme/theme.form'
import { createStyled } from '../../theme/util'
import { LocaleNamespace, Translate } from '../../translation'
import { DeepPartial } from '../../util'
import { FormLens, setScrolled } from '../util'
import { ButtonProps, ButtonSection } from './ButtonSection'
import { FieldAutocompleteAddress } from './FieldAutocompleteAddress'
import { FieldGroup } from './FieldGroup'
import { FieldMultiInput } from './FieldMultiInput'
import { FieldMultiInputAutosuggest } from './FieldMultiInputAutosuggest'
import { FieldRow } from './FieldRow'
import { FieldSection } from './FieldSection'
import { FieldSectionCard } from './FieldSectionCard'
import { FormConfigContext } from './form.hooks'
import { computeFormErrors } from './functions/computeErrors.form'
import { filterByHidden, filterByVisible } from './functions/filter.form'
import { filterChangedRepeatFormFields } from './functions/filter.form.repeatFields'
import { flatten } from './functions/flatten'
import { StaticField } from './StaticField'
import {
  DisplayType,
  FieldError,
  FormField,
  FormFieldOptions,
  FormFieldType,
  InternalFormField,
  OnChangeMulti,
} from './types'

type OnInvalidSubmitType<FormData> = (params: { errors: Array<FieldError>; formState: FormData }) => void

export type FormAnalytics<FormData> = {
  onSubmit?: () => void
  onInvalidSubmit?: OnInvalidSubmitType<FormData>
}

export type FormButtonProps<FormData> = ButtonProps<FormData>

export type FormProps<FormData> = {
  analytics?: FormAnalytics<FormData>
  buttons?: Array<FormButtonProps<FormData>>
  children?: ReactNode
  className?: string
  data: FormData
  dataTestId?: string
  disableDirtyValidation?: boolean
  disableValidation?: boolean
  display?: DisplayType
  formFields: Array<FormField<FormData>>
  formFieldOptions?: FormFieldOptions
  isInitialValidationActive?: boolean
  isEdit?: boolean
  isVisible?: (formData: FormData) => boolean
  localeNamespace?: LocaleNamespace
  onChange?: (formState: FormData) => void
  onChangeWithLens?: (lens: FormLens<FormData, any>, value: any) => void
  onEdit?: () => void
  onInvalidSubmit?: OnInvalidSubmitType<FormData>
  onSubmit?: (params: { formState: FormData }) => void
  readOnly?: boolean
  renderBottomChildren?: (f: FormData) => ReactNode
  renderTopChildren?: (f: FormData) => ReactNode
  skipAutoFocus?: boolean
  style?: DeepPartial<FormTheme>
}

export const Form = <FormData extends {}>(props: FormProps<FormData>) => {
  const { t: translate } = useTranslation(props.localeNamespace)
  const theme = useFormTheme()
  const getFormStyle = useCSSStyles(theme, 'form')(props.style?.form || {})

  const [showValidation, setShowValidation] = React.useState(false)

  const data = props.data
  const formFields = props.formFields
  const formReadOnly = props.readOnly

  const hiddenFormFields = flatten(
    filterByHidden({ data, formFields, formReadOnly, translate: translate as Translate }),
    data,
  )
  const visibleFormFields = filterByVisible({
    data,
    formFields,
    formReadOnly,
    translate: translate as Translate,
  })
  const changedRepeatFields = filterChangedRepeatFormFields({
    data,
    formFields,
    translate: translate as Translate,
  })

  const internalOnChange = (lens: FormLens<FormData, any>, value: any) => {
    if (props.onChangeWithLens) {
      props.onChangeWithLens(lens, value)
    } else if (props.onChange) {
      props.onChange(lens.set(value)(data))
    }
  }

  const internalOnChangeMulti: OnChangeMulti<FormData> = (fields) => {
    if (props.onChange) {
      let newData = { ...data }
      fields.forEach(({ lens, value }) => {
        newData = lens.set(value)(newData)
      })
      props.onChange(newData)
    }
  }

  // Set default values
  useEffect(() => {
    const formFieldsFlat = flatten(formFields, data)
    const deaultValueFields = []
    formFieldsFlat.forEach((field) => {
      if ('defaultValue' in field) {
        const value = field.lens.get(data)
        if ((value === null || value === undefined) && field.defaultValue !== undefined) {
          deaultValueFields.push({ lens: field.lens, value: field.defaultValue })
        }
      }
    })
    if (deaultValueFields.length > 0) {
      internalOnChangeMulti(deaultValueFields)
    }
  }, [formFields])

  // Reset hidden fields
  useEffect(() => {
    hiddenFormFields.forEach((f) => {
      const v = f.lens.get(data)
      if (v !== null) {
        internalOnChange(f.lens, null)
      }
    })
  }, [hiddenFormFields])

  useEffect(() => {
    changedRepeatFields.forEach((repeatSection) => {
      internalOnChange(repeatSection.field.lens, repeatSection.value)
    })
  }, [changedRepeatFields])

  useEffect(() => {
    setShowValidation(!!props.isInitialValidationActive)
    setScrolled(false)
  }, [formFields, props.isInitialValidationActive])

  const [errorFieldId, setErrorFieldId] = useState(null)

  const submit = () => {
    setErrorFieldId(null)
    if (props.disableValidation) {
      props.onSubmit({ formState: props.data })
    } else {
      const errors = computeFormErrors({ data, formFields: visibleFormFields })

      if (errors.length > 0) {
        setErrorFieldId(errors[0].fieldId)
        setShowValidation(true)
        props.onInvalidSubmit?.({ errors, formState: props.data })
        props.analytics?.onInvalidSubmit?.({ errors, formState: props.data })
      } else {
        props.onSubmit?.({ formState: props.data })
        props.analytics?.onSubmit?.()
      }
    }
  }

  const commonFieldProps = {
    autoFocus: false,
    data,
    errorFieldId,
    formReadOnly,
    formFieldOptions: props.formFieldOptions || {},
    localeNamespace: props.localeNamespace,
    onChange: internalOnChange,
    onChangeMulti: internalOnChangeMulti,
    showValidation,
    style: props.style,
  }

  const renderField = (field: InternalFormField<FormData>, fieldIndex: number) => {
    commonFieldProps.autoFocus = !props.skipAutoFocus && fieldIndex === 0

    if (Array.isArray(field)) {
      return (
        <FieldRow key={`field-form-${fieldIndex}`} fieldIndex={0} field={field} {...commonFieldProps} />
      )
    }

    switch (field.type) {
      case FormFieldType.FormFieldGroup: {
        return (
          <FieldGroup
            key={`field-group-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )
      }

      case FormFieldType.MultiInput:
        return (
          <FieldMultiInput
            key={`field-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )

      case FormFieldType.MultiInputAutosuggest:
        return (
          <FieldMultiInputAutosuggest
            key={`field-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )

      case FormFieldType.AutocompleteAddress:
        return (
          <FieldAutocompleteAddress
            key={`field-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )

      case FormFieldType.Static: {
        return (
          <StaticField
            {...field}
            fieldIndex={fieldIndex}
            formReadOnly={props.readOnly}
            key={`field-${fieldIndex}`}
          />
        )
      }

      case FormFieldType.FormSection:
        return (
          <FieldSection
            key={`field-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            onFormEdit={props.onEdit}
            {...commonFieldProps}
          />
        )

      case FormFieldType.FormSectionCard:
        return (
          <FieldSectionCard
            key={`field-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )

      default:
        return (
          <FieldRow
            key={`field-${fieldIndex}`}
            field={[field]}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )
    }
  }

  let formClassName = `${props.className} ` || ''
  formClassName = `${formClassName}${props.readOnly ? 'readonly' : ''}`

  return !props.isVisible || props.isVisible(data) ? (
    <FormConfigContext.Provider
      value={{
        disableDirtyValidation: !!props.disableDirtyValidation,
      }}
    >
      <FormWrapper
        {...getFormStyle('wrapper')}
        className={formClassName}
        dataTestId={props.dataTestId}
        readOnly={props.readOnly}
        onSubmit={(e: FormEvent) => {
          e.preventDefault()
        }}
      >
        {props.renderTopChildren && props.renderTopChildren(data)}

        <FormContent {...getFormStyle('content')}>{visibleFormFields.map(renderField)}</FormContent>

        {props.renderBottomChildren && props.renderBottomChildren(data)}

        {props.buttons && (
          <ButtonSection
            buttons={props.buttons}
            data={data}
            isEdit={!!props.isEdit}
            style={props.style?.form}
            submit={submit}
          />
        )}
      </FormWrapper>
    </FormConfigContext.Provider>
  ) : (
    <></>
  )
}

const FormWrapper = createStyled(styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`)

const FormContent = createStyled(styled.div`
  display: flex;
  flex-direction: column;
`)
