import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useFormTheme, useInlineStyle } from '../../theme/theme.form'
import { Field } from './Field'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormFieldError } from './hooks/useFormFieldError'
import { CommonThreadProps, SingleFormField } from './types'

const FieldContainer = styled.div`
  position: relative;
  width: 100%;
`
type Props<FormData> = CommonThreadProps<FormData> & {
  field: SingleFormField<FormData>
  onError?: (error: { error: string; fieldId: string }) => void
  isNotScrollable?: boolean
}
// ------------------------------------

export const FieldRowItem = <FormData extends {}>(props: Props<FormData>) => {
  const {
    data,
    errorFieldId,
    field,
    fieldIndex,
    formReadOnly,
    isNotScrollable,
    localeNamespace,
    onChange,
    onError,
    showValidation,
    style,
  } = props

  const theme = useFormTheme()
  const getRowStyle = useInlineStyle(theme, 'row')(style?.row || {})

  // Value handling
  const [value, setValue] = useState(field.lens.get(data))
  useEffect(() => {
    setValue(field.lens.get(data))
  }, [field.lens.get(data)])

  const onBlur = (value: any) => {
    onChange(field.lens, value)
  }

  // Error handling
  const errorLabel = useFormFieldError({ value, data, field, showValidation })
  const hasError = errorLabel !== null

  useEffect(() => {
    showValidation && onError?.({ error: errorLabel, fieldId: field.lens.id() })
  }, [showValidation, errorLabel])

  // Render components
  if (formReadOnly || field.readOnly) {
    return (
      <FieldItemReadOnly
        data={data}
        field={field as SingleFormField<FormData>}
        fieldIndex={fieldIndex}
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
        hasFocus={field.lens.id() === errorFieldId}
        localeNamespace={localeNamespace}
        onBlur={onBlur}
        onChange={setValue}
      />
    )) || (
      <FieldContainer>
        <FieldScrollableWrapper
          key={`field-${fieldIndex}`}
          isScrollToError={field.lens.id() === errorFieldId}
          style={getRowStyle('item', field.itemStyle).style}
        >
          <Field
            data={data}
            errorLabel={errorLabel}
            field={field as SingleFormField<FormData>}
            fieldIndex={fieldIndex}
            hasError={hasError}
            hasFocus={field.lens.id() === errorFieldId}
            localeNamespace={localeNamespace}
            onBlur={onBlur}
            onChange={setValue}
          />
        </FieldScrollableWrapper>
        {field.renderChildren?.()}
      </FieldContainer>
    ) || <></>
  )
}
