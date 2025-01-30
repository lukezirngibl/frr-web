import { Label } from '../../components/Label'
import { Option } from '../../components/menu/Menu.types'
import { Div } from '../../html'
import { FormTheme, useCSSStyles, useFormTheme } from '../../theme/theme.form'
import { FormLens } from '../util'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRowWrapper } from './FieldRow'
import { FieldRowItem } from './FieldRowItem'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormConfig } from './form.hooks'
import { useFormFieldErrors } from '../../hooks/useFormFieldError'
import { CommonThreadProps, MultiInputAutosuggestField, TextInputAutosuggestField } from './types'
import { createStyled } from '../../theme/util'
import styled from 'styled-components'

export type FieldMultiInputAutosuggestProps<FormData> = CommonThreadProps<FormData> & {
  field: MultiInputAutosuggestField<FormData>
}

// ------------------------------------
export const FieldMultiInputAutosuggest = <FormData extends {}>(
  props: FieldMultiInputAutosuggestProps<FormData>,
) => {
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
    formFieldOptions: props.formFieldOptions,
    formReadOnly: props.formReadOnly,
    localeNamespace: props.localeNamespace,
    showValidation: props.showValidation,
    disableDirtyValidation,
    style: props.style,
  }

  if (props.formReadOnly) {
    return (
      <FieldRowWrapper
        key={`row-${props.fieldIndex}`}
        {...getCssRowStyle('wrapper')}
        readOnly={props.formReadOnly}
      >
        <FieldItemReadOnly
          {...commonFieldProps}
          field={props.field as MultiInputAutosuggestField<FormData>}
          fieldIndex={props.fieldIndex}
        />
      </FieldRowWrapper>
    )
  }

  let isSelectSuggestion = false

  const onChange = (lens: FormLens<FormData, any>, value: string) => {
    // Propagate changes to form if not already done through onSelectSuggestion callback
    !isSelectSuggestion && props.onChange(lens, value)
  }

  const onSelectSuggestion =
    (currentField: TextInputAutosuggestField<FormData>) =>
    (suggestion: Option): void => {
      isSelectSuggestion = true

      // Provide to onSuggestionSelected of parent component (if present)
      currentField.onSuggestionSelected?.(suggestion)

      // Push field that reported change
      const changes: Array<{ lens: FormLens<FormData, any>; value: any }> = [
        { lens: currentField.lens, value: suggestion.value },
      ]

      // Change all referenced fields accordingly
      props.field.fields
        .filter((fieldItem) => fieldItem.lens.id() !== currentField.lens.id())
        .forEach((fieldItem) => {
          const fieldItemId = fieldItem.lens.id().split('.').pop()
          const value = suggestion.data[fieldItemId]
          if (value !== undefined) {
            changes.push({ lens: fieldItem.lens, value })

            // Clear error for other fields
            onError({ error: null, fieldId: fieldItem.lens.id() })
          }
        })

      // Propagate changes to form
      props.onChangeMulti?.(changes)
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
            {...props.field.label}
          />
        )}

        <Div
          {...getCssMultiInputStyle('item')}
          key={`field-mulit-input-autosuggest-${props.fieldIndex}`}
        >
          {props.field.fields.map((fieldItem, fieldItemIndex) => (
            <FieldRowItemWrapper
              key={`field-item-${fieldItem.lens.id()}-${fieldItemIndex}`}
              {...getCssMultiInputStyle(
                `itemField${fieldItemIndex + 1}` as keyof FormTheme['fieldMultiInput'],
              )}
            >
              {' '}
              <FieldRowItem
                {...commonFieldProps}
                autoFocus={props.autoFocus && fieldItemIndex === 0}
                field={{
                  ...fieldItem,
                  label: props.formFieldOptions.showMultiInputFieldLabels ? fieldItem.label : null,
                  onSuggestionSelected: onSelectSuggestion(fieldItem),
                }}
                fieldIndex={fieldItemIndex}
                errorFieldId={props.errorFieldId}
                inputRef={
                  undefined /* fieldItemIndex === field.fields.length - 1 ? lastFieldRef : undefined */
                }
                onChange={onChange}
                onError={onError}
                isNotScrollable
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
