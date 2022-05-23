import { Label } from '../../components/Label'
import { createStyled } from '../../theme/util'
import React, { useCallback, useState } from 'react'
import { useFormTheme } from '../theme/theme'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRowWrapper } from './FieldRow'
import { FieldRowItem } from './FieldRowItem'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormFieldErrors } from './hooks/useFormFieldError'
import { CommonThreadProps, MultiInputField } from './types'

type FieldRowProps<FormData> = CommonThreadProps<FormData> & {
  field: MultiInputField<FormData>
}

const WrapperItem = createStyled('div')

// ------------------------------------
export const FieldMultiInput = <FormData extends {}>({
  data,
  errorFieldId,
  field,
  fieldIndex,
  formReadOnly,
  localeNamespace,
  onChange,
  showValidation,
  style,
}: FieldRowProps<FormData>) => {
  // Form styles
  const theme = useFormTheme()

  const getFieldMultiInputStyle = useInlineStyle(theme, 'fieldMultiInput')({ item: field.itemStyle })
  const getRowStyle = useInlineStyle(theme, 'row')(style?.row || {})
  const getCssRowStyle = useCSSStyles(theme, 'row')(style?.row || {})

  // Error
  const [errors, setErrors] = useState([])
  const onError = (error: { error: string; fieldId: string }) => {
    const errorIndex = errors.findIndex((err) => err.fieldId === error.fieldId)
    const newErrors = [...errors]
    if (errorIndex === -1 && !!error.error) {
      newErrors.push(error)
    } else if (errorIndex > -1) {
      newErrors[errorIndex] = error
    }
    setErrors(newErrors.filter(err => !!err.error))
  }

  const { errorLabel, errorDataTestId } = useFormFieldErrors({ errors })

  const commonFieldProps = {
    data,
    formReadOnly,
    localeNamespace,
    showValidation,
    style,
  }

  if (formReadOnly) {
    return (
      <FieldRowWrapper key={`row-${fieldIndex}`} {...getCssRowStyle('wrapper')} readOnly={formReadOnly}>
        <FieldItemReadOnly
          {...commonFieldProps}
          field={field as MultiInputField<FormData>}
          fieldIndex={fieldIndex}
        />
      </FieldRowWrapper>
    )
  }

  return (
    <FieldRowWrapper key={`row-${fieldIndex}`} {...getCssRowStyle('wrapper')} readOnly={formReadOnly}>
      <FieldScrollableWrapper
        key={`field-${fieldIndex}`}
        isScrollToError={
          field.fields.findIndex((fieldItem) => fieldItem.lens.id() === errorFieldId) !== -1
        }
        {...getRowStyle('item')}
      >
        {field.label && (
          <Label
            localeNamespace={localeNamespace}
            error={errorLabel.length > 0}
            errorLabel={errorLabel}
            errorDataTestId={errorDataTestId}
            {...field.label}
          />
        )}

        <WrapperItem {...getFieldMultiInputStyle('item')} key={`field-mulit-input-${fieldIndex}`}>
          {field.fields.map((fieldItem, fieldItemIndex) => (
            <FieldRowItem
              {...commonFieldProps}
              key={`field-item-${fieldItemIndex}`}
              field={fieldItem}
              fieldIndex={fieldItemIndex}
              errorFieldId={errorFieldId}
              onChange={onChange}
              onError={onError}
              isNotScrollable
            />
          ))}
        </WrapperItem>
      </FieldScrollableWrapper>
    </FieldRowWrapper>
  )
}
