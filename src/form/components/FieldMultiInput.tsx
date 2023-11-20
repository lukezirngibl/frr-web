import { useCallback, useState } from 'react'
import { Label } from '../../components/Label'
import { useCSSStyles, useFormTheme, useInlineStyle } from '../../theme/theme.form'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRowWrapper } from './FieldRow'
import { FieldRowItem } from './FieldRowItem'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormConfig } from './form.hooks'
import { useFormFieldErrors } from './hooks/useFormFieldError'
import { CommonThreadProps, MultiInputField } from './types'
import { Div } from '../../html'

type FieldRowProps<FormData> = CommonThreadProps<FormData> & {
  field: MultiInputField<FormData>
}

// ------------------------------------
export const FieldMultiInput = <FormData extends {}>(props: FieldRowProps<FormData>) => {
  // Form styles
  const theme = useFormTheme()

  const getFieldMultiInputStyle = useInlineStyle(
    theme,
    'fieldMultiInput',
  )({ item: props.field.itemStyle })
  const getCssRowStyle = useCSSStyles(theme, 'row')(props.style?.row || {})

  // Error
  const { disableDirtyValidation } = useFormConfig()
  const { errorLabel, errorDataTestId, onError } = useFormFieldErrors()

  const commonFieldProps = {
    autoFocus: false,
    data: props.data,
    formReadOnly: props.formReadOnly,
    localeNamespace: props.localeNamespace,
    showValidation: props.showValidation,
    disableDirtyValidation,
    style: props.style,
  }

  // Focus
  const [isFocused, setIsFocused] = useState(false)
  const onFocus = useCallback(() => {
    setIsFocused(true)
  }, [])
  const onBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  if (props.formReadOnly) {
    return (
      <FieldRowWrapper
        key={`row-${props.fieldIndex}`}
        {...getCssRowStyle('wrapper')}
        readOnly={props.formReadOnly}
      >
        <FieldItemReadOnly
          {...commonFieldProps}
          field={props.field as MultiInputField<FormData>}
          fieldIndex={props.fieldIndex}
        />
      </FieldRowWrapper>
    )
  }

  return (
    <FieldRowWrapper
      key={`row-${props.fieldIndex}`}
      {...getCssRowStyle('wrapper')}
      readOnly={props.formReadOnly}
    >
      <FieldScrollableWrapper
        key={`field-${props.fieldIndex}`}
        isScrollToError={
          props.field.fields.findIndex((fieldItem) => fieldItem.lens.id() === props.errorFieldId) !== -1
        }
        style={props.style}
      >
        {props.field.label && (
          <Label
            localeNamespace={props.localeNamespace}
            error={errorLabel.length > 0}
            errorLabel={errorLabel}
            errorDataTestId={errorDataTestId}
            isFocused={isFocused}
            {...props.field.label}
          />
        )}

        <Div {...getFieldMultiInputStyle('item')} key={`field-mulit-input-${props.fieldIndex}`}>
          {props.field.fields.map((fieldItem, fieldItemIndex) => (
            <FieldRowItem
              {...commonFieldProps}
              autoFocus={props.autoFocus && fieldItemIndex === 0}
              errorFieldId={props.errorFieldId}
              field={fieldItem}
              fieldIndex={fieldItemIndex}
              isNotScrollable
              key={`field-item-${fieldItem.lens.id()}-${fieldItemIndex}`}
              onBlur={onBlur}
              onChange={props.onChange}
              onError={onError}
              onFocus={onFocus}
            />
          ))}
        </Div>
      </FieldScrollableWrapper>
    </FieldRowWrapper>
  )
}
