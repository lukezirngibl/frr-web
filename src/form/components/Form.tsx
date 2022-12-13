import React, { FormEvent, Fragment, ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Button, ButtonType, Props as OriginalButtonProps } from '../../components/Button'
import { FormTheme, useCSSStyles, useFormTheme } from '../../theme/theme.form'
import { createStyled } from '../../theme/util'
import { LocaleNamespace } from '../../translation'
import { FormLens, setScrolled } from '../util'
import { FieldGroup } from './FieldGroup'
import { FieldMultiInput } from './FieldMultiInput'
import { FieldMultiInputAutosuggest } from './FieldMultiInputAutosuggest'
import { FieldRow } from './FieldRow'
import { FieldSection } from './FieldSection'
import { FieldSectionCard } from './FieldSectionCard'
import { FormConfigContext } from './form.hooks'
import { filterByHidden, filterByVisible } from './functions/filter.form'
import { filterChangedRepeatFormFields } from './functions/filter.form.repeatFields'
import { flatten } from './functions/flatten'
import { mapFormFields } from './functions/map.form'
import { computeFieldError } from './hooks/useFormFieldError'
import { StaticField } from './StaticField'
import {
  DisplayType,
  FieldError,
  FormField,
  FormFieldType,
  InternalFormField,
  SingleFormField,
} from './types'

type OnInvalidSubmitType<FormData> = (params: { errors: Array<FieldError>; formState: FormData }) => void

export type FormAnalytics<FormData> = {
  onSubmit?: () => void
  onInvalidSubmit?: OnInvalidSubmitType<FormData>
}

export type FormButtonProps<FormData> = Omit<OriginalButtonProps, 'onClick'> & {
  onClick: (params: { submit: () => void }) => void
  isDisabled?: (d: FormData) => boolean
}

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
  style?: Partial<FormTheme>
}

export const Form = <FormData extends {}>(props: FormProps<FormData>) => {
  const { t: translate } = useTranslation(props.localeNamespace)
  const theme = useFormTheme()
  const getFormStyle = useCSSStyles(theme, 'form')(props.style?.form || {})

  const [showValidation, setShowValidation] = React.useState(false)

  const data = props.data
  const formFields = props.formFields

  const hiddenFormFields = flatten(filterByHidden({ data, formFields, translate }), data)
  const visibleFormFields = filterByVisible({ data, formFields, translate })
  const changedRepeatFields = filterChangedRepeatFormFields({ data, formFields, translate })

  const internalOnChange = (lens: FormLens<FormData, any>, value: any) => {
    if (props.onChangeWithLens) {
      props.onChangeWithLens(lens, value)
    } else if (props.onChange) {
      props.onChange(lens.set(value)(data))
    }
  }

  const internalOnChangeMulti = (fields: Array<{ lens: FormLens<FormData, any>; value: any }>) => {
    if (props.onChange) {
      let newData = { ...data }
      fields.forEach(({ lens, value }) => {
        newData = lens.set(value)(newData)
      })
      props.onChange(newData)
    }
  }

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
    setShowValidation(false)
    setScrolled(false)
  }, [formFields])

  const getFieldError = (
    field: SingleFormField<FormData>,
  ): { error: string | null; fieldId: string } => {
    const value = field.lens.get(data)
    return computeFieldError({ value, data, field, isValidate: true })
  }

  const [errorFieldId, setErrorFieldId] = useState(null)

  const submit = () => {
    setErrorFieldId(null)
    if (props.disableValidation) {
      props.onSubmit({ formState: props.data })
    } else {
      const errors = mapFormFields(visibleFormFields, getFieldError).filter(
        (fieldError) => !!fieldError.error,
      )

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
    formReadOnly: props.readOnly,
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
        data-test-id={props.dataTestId}
        readOnly={props.readOnly}
        onSubmit={(e: FormEvent) => {
          e.preventDefault()
        }}
      >
        {props.renderTopChildren && props.renderTopChildren(data)}

        <FormContent {...getFormStyle('content')}>{visibleFormFields.map(renderField)}</FormContent>

        {props.renderBottomChildren && props.renderBottomChildren(data)}

        {props.buttons && (
          <ButtonContainer
            {...getFormStyle('buttonContainer')}
            disabled={props.isEdit !== undefined && !props.isEdit}
            data-test-id="form-actions"
          >
            {props.buttons.map((button, buttonKey) => {
              // By default the browsers do not focus disabled elements
              // In case the form is controlled by a disabled function, we need to have a tab step before the button to allow it to become anabled once the validation passes
              const shouldAddTabIndexDiv = button.isDisabled && button.type === ButtonType.Primary

              return (
                <Fragment key={`button-${buttonKey}`}>
                  {shouldAddTabIndexDiv && <div tabIndex={0} />}
                  <Button
                    {...button}
                    dataTestId={mapButtonDataTestId(button, buttonKey)}
                    disabled={button.isDisabled ? button.isDisabled(data) : !!button.disabled}
                    onClick={() => button.onClick({ submit })}
                    tabIndex={button.type === ButtonType.Secondary ? -1 : 0}
                  />
                </Fragment>
              )
            })}
          </ButtonContainer>
        )}
      </FormWrapper>
    </FormConfigContext.Provider>
  ) : (
    <></>
  )
}

const mapButtonDataTestId = (button: FormButtonProps<any>, k: number) =>
  button.dataTestId ||
  (button.type === ButtonType.Primary && 'form:primary') ||
  `form:${(button.type || ButtonType.Secondary).toLowerCase()}:${k + 1}`

const FormWrapper = createStyled(styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`)

const FormContent = createStyled(styled.div`
  display: flex;
  flex-direction: column;
`)

const ButtonContainer = createStyled(styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`)
