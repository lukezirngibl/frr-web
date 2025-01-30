import { useCallback, useState } from 'react'
import { Label } from '../../components/Label'
import { FormTheme, useCSSStyles, useFormTheme, useInlineStyle } from '../../theme/theme.form'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRowWrapper } from './FieldRow'
import { FieldRowItem } from './FieldRowItem'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormConfig } from './form.hooks'
import { useFormFieldErrors } from '../../hooks/useFormFieldError'
import { CommonThreadProps, MultiInputField } from './types'
import { Div } from '../../html'
import { createStyled } from '../../theme/util'
import styled from 'styled-components'

type FieldRowProps<FormData> = CommonThreadProps<FormData> & {
  field: MultiInputField<FormData>
}

// ------------------------------------
export const FieldMultiInput = <FormData extends {}>(props: FieldRowProps<FormData>) => {
  // Form styles
  const theme = useFormTheme()
  const getCssMultiInputStyle = useCSSStyles(theme, 'fieldMultiInput')(props.field.style)
  const getCssRowStyle = useCSSStyles(theme, 'row')(props.style?.row || {})

  // Error
  const { disableDirtyValidation } = useFormConfig()
  const { errorLabel, errorDataTestId, onError } = useFormFieldErrors()

  const commonFieldProps = {
    autoFocus: false,
    data: props.data,
    formReadOnly: props.formReadOnly,
    formFieldOptions: props.formFieldOptions,
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
        {!props.formFieldOptions.showMultiInputFieldLabels && props.field.label && (
          <Label
            localeNamespace={props.localeNamespace}
            error={errorLabel.length > 0}
            errorLabel={errorLabel}
            errorDataTestId={errorDataTestId}
            isFocused={isFocused}
            {...props.field.label}
          />
        )}

        <Div {...getCssMultiInputStyle('item')} key={`field-mulit-input-${props.fieldIndex}`}>
          {props.field.fields.map((fieldItem, fieldItemIndex) => (
            <FieldRowItemWrapper
              key={`field-item-${fieldItem.lens.id()}-${fieldItemIndex}`}
              {...getCssMultiInputStyle(
                `itemField${fieldItemIndex + 1}` as keyof FormTheme['fieldMultiInput'],
              )}
            >
              <FieldRowItem
                {...commonFieldProps}
                autoFocus={props.autoFocus && fieldItemIndex === 0}
                errorFieldId={props.errorFieldId}
                field={{
                  ...fieldItem,
                  label: props.formFieldOptions.showMultiInputFieldLabels ? fieldItem.label : null,
                }}
                fieldIndex={fieldItemIndex}
                isNotScrollable
                onBlur={onBlur}
                onChange={props.onChange}
                onError={onError}
                onFocus={onFocus}
              />
            </FieldRowItemWrapper>
          ))}
        </Div>
      </FieldScrollableWrapper>
    </FieldRowWrapper>
  )
}

const FieldRowItemWrapper = createStyled(styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`)
