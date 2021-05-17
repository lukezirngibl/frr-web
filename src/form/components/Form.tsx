import {
  Button,
  ButtonType,
  Props as ButtonProps,
} from '../../components/Button'
import { createStyled } from '../../theme/util'
import { LocaleNamespace } from '../../translation'
import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { FormTheme, useFormTheme } from '../theme/theme'
import { useCSSStyles } from '../theme/util'
import { FormLens, setScrolled } from '../util'
import { FieldGroup } from './FieldGroup'
import { FieldMultiInput } from './FieldMultiInput'
import { FieldRow } from './FieldRow'
import { FieldSection } from './FieldSection'
import { mapFormFields } from './functions/map.form'
import { filterByVisible, filterByHidden } from './functions/filter.form'
import { computeFieldError } from './hooks/useFormFieldError'
import {
  DisplayType,
  FieldError,
  FormField,
  FormFieldType,
  SingleFormField,
  InternalFormField,
} from './types'
import { StaticField } from './StaticField'

type OnInvalidSubmitType<FormData> = (params: {
  errors: Array<FieldError>
  formState: FormData
}) => void

export type FormAnalytics<FormData> = {
  onSubmit?: () => void
  onInvalidSubmit?: OnInvalidSubmitType<FormData>
}

export type FormProps<FormData> = {
  analytics?: FormAnalytics<FormData>
  buttons?: Array<
    Omit<ButtonProps, 'onClick'> & {
      onClick: (params: { submit: () => void; dispatch: any }) => void
      isDisabled?: (d: FormData) => boolean
    }
  >
  children?: ReactNode
  data: FormData
  dataTestId?: string
  disableValidation?: boolean
  display?: DisplayType
  formFields: Array<FormField<FormData>>
  isVisible?: (formData: FormData) => boolean
  localeNamespace?: LocaleNamespace
  onChange: (formState: FormData) => void
  onChangeWithLens?: (lens: FormLens<FormData, any>, value: any) => void
  onInvalidSubmit?: OnInvalidSubmitType<FormData>
  onSubmit?: (params: { dispatch: any; formState: FormData }) => void
  readOnly?: boolean
  renderBottomChildren?: (f: FormData) => ReactNode
  renderTopChildren?: (f: FormData) => ReactNode
  style?: Partial<FormTheme>
}

const ButtonContainer = createStyled(styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`)

const FormWrapper = createStyled(styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`)

const FormContent = createStyled(styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`)

export const Form = <FormData extends {}>({
  analytics,
  buttons,
  data,
  dataTestId,
  disableValidation,
  formFields,
  isVisible,
  localeNamespace,
  onChange,
  onChangeWithLens,
  onInvalidSubmit,
  onSubmit,
  readOnly,
  renderBottomChildren,
  renderTopChildren,
  style,
}: FormProps<FormData>) => {
  const dispatch = useDispatch()
  const theme = useFormTheme()
  const getFormStyle = useCSSStyles(theme, 'form')(style?.form || {})

  const [showValidation, setShowValidation] = React.useState(false)

  const [initialData] = React.useState<FormData>(data)

  const hiddenFormFields = filterByHidden(data)(formFields)
  const visibleFormFields = filterByVisible(data)(formFields)

  useEffect(() => {
    // console.log('visibleFormFields: ', visibleFormFields)
    // console.log('hiddenFormFields: ', hiddenFormFields)
  }, [data])

  useEffect(() => {
    setShowValidation(false)
    setScrolled(false)
  }, [formFields])

  const getFieldError = (
    field: SingleFormField<FormData>,
  ): { error: string | null; fieldId: string } => {
    const value = field.lens.get(data)
    return computeFieldError({ value, data, field })
  }

  const [errorFieldId, setErrorFieldId] = useState(null)

  const submit = () => {
    setErrorFieldId(null)
    if (disableValidation) {
      onSubmit({ dispatch, formState: data })
    } else {
      const errors = mapFormFields(visibleFormFields, getFieldError).filter(
        (fieldError) => !!fieldError.error,
      )

      if (errors.length > 0) {
        setErrorFieldId(errors[0].fieldId)
        setShowValidation(true)
        onInvalidSubmit?.({ errors, formState: data })
        analytics?.onInvalidSubmit?.({ errors, formState: data })
      } else {
        onSubmit?.({ dispatch, formState: data })
        analytics?.onSubmit?.()
      }
    }
  }

  const internalOnChange = (lens: FormLens<FormData, any>, value: any) => {
    if (onChangeWithLens) {
      onChangeWithLens(lens, value)
    } else {
      onChange(lens.set(value)(data))
    }
  }

  const commonFieldProps = {
    data,
    errorFieldId,
    formReadOnly: readOnly,
    localeNamespace,
    onChange: internalOnChange,
    showValidation,
    style,
  }

  const renderField = (
    field: InternalFormField<FormData>,
    fieldIndex: number,
  ) => {
    if (Array.isArray(field)) {
      return (
        <FieldRow
          key={`field-form-${fieldIndex}`}
          fieldIndex={0}
          field={field}
          {...commonFieldProps}
        />
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

      case FormFieldType.Static: {
        return (
          <StaticField
            {...field}
            fieldIndex={fieldIndex}
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

  return !isVisible || isVisible(data) ? (
    <FormWrapper
      {...getFormStyle('wrapper')}
      className={readOnly ? 'readonly' : ''}
      data-test-id={dataTestId}
    >
      {renderTopChildren && renderTopChildren(data)}

      <FormContent {...getFormStyle('content')}>
        {/* formFields.map(renderFormField) */}

        {visibleFormFields.map(renderField)}
      </FormContent>

      {renderBottomChildren && renderBottomChildren(data)}

      {buttons && (
        <ButtonContainer {...getFormStyle('buttonContainer')}>
          {buttons.map((button, k) => (
            <Button
              {...button}
              key={k}
              dataTestId={
                button.type === ButtonType.Primary
                  ? 'form:primary'
                  : `form:${(
                      button.type || ButtonType.Secondary
                    ).toLowerCase()}:${k + 1}`
              }
              disabled={
                button.isDisabled ? button.isDisabled(data) : !!button.disabled
              }
              onClick={() => button.onClick({ submit, dispatch })}
            />
          ))}
        </ButtonContainer>
      )}
    </FormWrapper>
  ) : (
    <></>
  )
}
