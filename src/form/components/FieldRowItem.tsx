import React, { useEffect, useState } from 'react'
import { Field } from './Field'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormFieldError } from './hooks/useFormFieldError'
import { CommonThreadProps, SingleFormField } from './types'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { useFormTheme } from '../theme/theme'
import styled from 'styled-components'

const FieldContainer = styled.div`
  position: relative;
  width: 100%;
`
type Props<FormData> = CommonThreadProps<FormData> & {
  field: SingleFormField<FormData>
  onError?: (error: { error: string; fieldId: string }) => void
  isNotScrollable?: boolean
  onKeyUp?: (value: string) => void
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
    onKeyUp,
    showValidation,
    style,
  } = props

  const theme = useFormTheme()
  const getRowStyle = useInlineStyle(theme, 'row')(style?.row || {})

  // Value handling
  const [fieldChanged, setFieldChanged] = useState(false)
  const [value, setValue] = useState(field.lens.get(data))
  useEffect(() => {
    setValue(field.lens.get(data))
  }, [field.lens.get(data)])

  const onBlur = (value: any) => {
    setFieldChanged(true)
    onChange(field.lens, value)
  }

  const isDirty = value !== null

  // console.log(
  //   field.lens.id(),
  //   'IS DIRTY',
  //   isDirty,
  //   'VALUE',
  //   value,
  //   field.lens.get(data),
  //   'FIELD CHANGED',
  //   fieldChanged,
  // )

  // Error handling
  const errorLabel = useFormFieldError({
    value,
    data,
    field,
    isDirty,
    showValidation: showValidation || fieldChanged,
  })
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
        onKeyUp={onKeyUp}
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
            onKeyUp={onKeyUp}
          />
        </FieldScrollableWrapper>
        {field.renderChildren?.()}
      </FieldContainer>
    ) || <></>
  )
}
