import { Label } from '../../components/Label'
import { Option } from '../../components/menu/Menu.types'
import { Div } from '../../html'
import { useCSSStyles, useFormTheme } from '../../theme/theme.form'
import { FormLens } from '../util'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRowWrapper } from './FieldRow'
import { FieldRowItem } from './FieldRowItem'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormConfig } from './form.hooks'
import { useFormFieldErrors } from '../../hooks/useFormFieldError'
import { CommonThreadProps, MultiInputAutosuggestField, TextInputAutosuggestField } from './types'

export type FieldMultiInputAutosuggestProps<FormData> = CommonThreadProps<FormData> & {
  field: MultiInputAutosuggestField<FormData>
}

// ------------------------------------
export const FieldMultiInputAutosuggest = <FormData extends {}>(
  props: FieldMultiInputAutosuggestProps<FormData>,
) => {
  // Form styles
  const theme = useFormTheme()
  const getCssMultiInputStyle = useCSSStyles(theme, 'fieldMultiInput')({ item: props.field.itemStyle })
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
            <FieldRowItem
              {...commonFieldProps}
              autoFocus={props.autoFocus && fieldItemIndex === 0}
              key={`field-item-${fieldItem.lens.id()}-${fieldItemIndex}`}
              field={{ ...fieldItem, onSuggestionSelected: onSelectSuggestion(fieldItem) }}
              fieldIndex={fieldItemIndex}
              errorFieldId={props.errorFieldId}
              inputRef={
                undefined /* fieldItemIndex === field.fields.length - 1 ? lastFieldRef : undefined */
              }
              onChange={onChange}
              onError={onError}
              isNotScrollable
            />
          ))}
        </Div>
      </FieldScrollableWrapper>
    </FieldRowWrapper>
  )
}
