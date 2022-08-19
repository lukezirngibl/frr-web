import React, { useEffect } from 'react'

import { Label } from '../../components/Label'
import { useCSSStyles, useFormTheme, useInlineStyle } from '../../theme/theme.form'
import { createStyled } from '../../theme/util'
import { useFormFieldErrors } from './hooks/useFormFieldError'

import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRowWrapper } from './FieldRow'
import { FieldRowItem } from './FieldRowItem'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormConfig } from './form.hooks'
import { CommonThreadProps, MultiInputAutosuggestField, TextInputAutosuggestField } from './types'
import { FormLens } from '../util'
import { Option } from '../../components/menu/Menu.types'

export type FieldMultiInputAutosuggestProps<FormData> = CommonThreadProps<FormData> & {
  field: MultiInputAutosuggestField<FormData>
}

type Value = string | number | null
type City = {
  id: number
  city: string
  zip: number
  searchstring: string
}

const WrapperItem = createStyled('div')

// ------------------------------------
export const FieldMultiInputAutosuggest = <FormData extends {}>({
  data,
  errorFieldId,
  field,
  fieldIndex,
  formReadOnly,
  localeNamespace,
  onChange,
  onChangeMany,
  showValidation,
  style,
}: FieldMultiInputAutosuggestProps<FormData>) => {
  // Form styles
  const theme = useFormTheme()

  const getFieldMultiInputStyle = useInlineStyle(theme, 'fieldMultiInput')({ item: field.itemStyle })
  const getRowStyle = useInlineStyle(theme, 'row')(style?.row || {})
  const getCssRowStyle = useCSSStyles(theme, 'row')(style?.row || {})

  // Error
  const { disableDirtyValidation } = useFormConfig()
  const { errorLabel, errorDataTestId, onError } = useFormFieldErrors()

  const commonFieldProps = {
    data,
    formReadOnly,
    localeNamespace,
    showValidation,
    disableDirtyValidation,
    style,
  }

  // useEffect(() => {
  //   fields.forEach((field) => {
  //     const value = field.lens.get(data)

  //     // Set value based
  //     if (value === undefined || value === null) {
  //       onChange(field.lens, )
  //     }
  //   })
  // }, [data])

  if (formReadOnly) {
    return (
      <FieldRowWrapper key={`row-${fieldIndex}`} {...getCssRowStyle('wrapper')} readOnly={formReadOnly}>
        <FieldItemReadOnly
          {...commonFieldProps}
          field={field as MultiInputAutosuggestField<FormData>}
          fieldIndex={fieldIndex}
        />
      </FieldRowWrapper>
    )
  }

  const [changedFields, setChangedFields] = React.useState<
    Array<{ lens: FormLens<FormData, any>; value: any }>
  >([])
  const setSuggestion =
    (currentField: TextInputAutosuggestField<FormData>) =>
    (suggestion: Option): void => {
      console.log('SUGGESTION SELECTED', currentField.lens.id(), suggestion)

      // Provide to onSuggestionSelected of parent component (if present)
      currentField.onSuggestionSelected?.(suggestion)

      // Push field that reported change
      const changes: Array<{ lens: FormLens<FormData, any>; value: any }> = [
        { lens: currentField.lens, value: suggestion.value },
      ]

      // Change all referenced fields accordingly
      field.fields.forEach((fieldItem) => {
        if (fieldItem.lens.id() !== currentField.lens.id()) {
          const value = suggestion.data[fieldItem.lens.id()]
          if (value !== undefined) {
            changes.push({ lens: fieldItem.lens, value })
          }
        }
      })

      // Save new changes in state
      setChangedFields(changes)
    }

  // Propagate changes to form
  useEffect(() => {
    changedFields.forEach((changedField) => {
      onChange(changedField.lens, changedField.value)
    })
  }, [changedFields])

  console.log('DATA', data)

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

        <WrapperItem
          {...getFieldMultiInputStyle('item')}
          key={`field-mulit-input-autosuggest-${fieldIndex}`}
        >
          {field.fields.map((fieldItem, fieldItemIndex) => (
            <FieldRowItem
              {...commonFieldProps}
              key={`field-item-${fieldItem.lens.id()}-${fieldItemIndex}`}
              field={{ ...fieldItem, onSuggestionSelected: setSuggestion(fieldItem) }}
              fieldIndex={fieldItemIndex}
              errorFieldId={errorFieldId}
              onChange={onChange}
              onError={onError}
              isNotScrollable
            />
          ))}

          {/* <FieldRowItem
            {...commonFieldProps}
            key={`zipField-item`}
            field={zipField}
            fieldIndex={0}
            errorFieldId={errorFieldId}
            onChange={onChange}
            onError={onError}
            isNotScrollable
          />

          {showSelect ? (
            <Select
              dataTestId={`${cityField.lens.id()}-select-item`}
              options={selectCityOptions}
              onChange={(value) =>
                setSelectedCity(
                  filteredCitiesById.find((city) => city.id.toString() === value.toString()),
                )
              }
              value={!!selectedCity ? selectedCity.id : null}
              style={{ wrapper: { width: 328 }, select: { width: 328 } }}
            />
          ) : (
            <FieldRowItem
              {...commonFieldProps}
              key={`cityField-item`}
              field={cityField}
              fieldIndex={1}
              errorFieldId={errorFieldId}
              onChange={onChange}
              onError={onError}
              isNotScrollable
            />
          )*/}
        </WrapperItem>
      </FieldScrollableWrapper>
    </FieldRowWrapper>
  )
}

const FieldRowWithSelect = ({}) => {}
