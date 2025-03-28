import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Field } from './Field'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormConfig } from './form.hooks'
import { useFormFieldError } from '../../hooks/useFormFieldError'
import { CommonThreadProps, FormFieldType, SingleFormField } from './types'

const FieldContainer = styled.div`
  position: relative;
  width: 100%;
`
export type Props<FormData> = CommonThreadProps<FormData> & {
  field: SingleFormField<FormData>
  inputRef?: React.MutableRefObject<HTMLElement>
  isNotScrollable?: boolean
  onBlur?: () => void
  onError?: (error: { error: string; fieldId: string }) => void
  onFocus?: () => void
}
// ------------------------------------

export const FieldRowItem = <FormData extends {}>(props: Props<FormData>) => {
  const {
    autoFocus,
    data,
    errorFieldId,
    field,
    fieldIndex,
    formReadOnly,
    formFieldOptions,
    inputRef,
    isNotScrollable,
    localeNamespace,
    onChange,
    onError,
    onFocus,
    showValidation,
    style,
  } = props

  const { disableDirtyValidation } = useFormConfig()
  const formValue = field.lens.get(data)

  // Value handling
  const [fieldChanged, setFieldChanged] = useState(false)
  const [value, setValue] = useState(formValue)

  useEffect(() => {
    setValue(formValue)
  }, [formValue])

  const onBlur = (value: any) => {
    setFieldChanged(true)
    if (value && typeof value === 'object' && 'num' in value) {
      setValue(value.value)
      onChange(field.lens, value.num)
    } else {
      onChange(field.lens, value)
    }
  }

  // Error handling
  const isPristine = value === null || (value === '' && field.isInitialeEmptyString)
  const isDirty = !isPristine && !disableDirtyValidation
  const isShowError = showValidation || (fieldChanged && !isPristine && !disableDirtyValidation)

  const errorLabel = useFormFieldError({
    value,
    data,
    field,
    isDirty,
    showValidation: isShowError,
  })
  const hasError = errorLabel !== null

  useEffect(() => {
    isShowError && onError?.({ error: errorLabel, fieldId: field.lens.id() })
  }, [isShowError, errorLabel])

  
  // Render components
  if (formReadOnly || field.readOnly) {
    return (
      <FieldItemReadOnly
        data={data}
        field={field as SingleFormField<FormData>}
        fieldIndex={fieldIndex}
        formFieldOptions={formFieldOptions}
        localeNamespace={localeNamespace}
        style={style}
      />
    )
  }

  return (
    (isNotScrollable && (
      <Field
        data={data}
        errorLabel={errorLabel}
        field={field as SingleFormField<FormData>}
        fieldIndex={fieldIndex}
        hasError={hasError}
        hasFocus={field.lens.id() === errorFieldId || autoFocus}
        inputRef={inputRef}
        localeNamespace={localeNamespace}
        onFocus={onFocus}
        onBlur={field.forceOnChange ? () => {} : onBlur}
        onChange={(v) => {
          if (field.forceOnChange) {
            onBlur(v)
          } else {
            setValue(v)
          }
        }}
      />
    )) || (
      <FieldContainer>
        <FieldScrollableWrapper
          key={`field-${fieldIndex}`}
          isScrollToError={field.lens.id() === errorFieldId}
          style={props.style}
        >
          <Field
            data={data}
            errorLabel={errorLabel}
            field={field as SingleFormField<FormData>}
            fieldIndex={fieldIndex}
            hasError={hasError}
            hasFocus={field.lens.id() === errorFieldId || autoFocus}
            inputRef={inputRef}
            localeNamespace={localeNamespace}
            onFocus={onFocus}
            onBlur={field.forceOnChange ? () => {} : onBlur}
            onChange={(v) => {
              if (field.forceOnChange) {
                onBlur(v)
              } else {
                setValue(v)
              }
            }}
          />
        </FieldScrollableWrapper>
        {field.renderChildren?.()}
      </FieldContainer>
    ) || <></>
  )
}
