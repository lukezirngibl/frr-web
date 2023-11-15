import React, { useEffect, useRef, useState } from 'react'

import { createStyled } from '../../theme/util'

import { Label } from '../../components/Label'
import { useCSSStyles, useFormTheme, useInlineStyle } from '../../theme/theme.form'

import { useFormFieldErrors } from './hooks/useFormFieldError'

import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRowWrapper } from './FieldRow'
import { FieldRowItem } from './FieldRowItem'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormConfig } from './form.hooks'
import { CommonThreadProps, MultiInputAutosuggestField, TextInputAutosuggestField } from './types'
import { FormLens } from '../util'
import { Option } from '../../components/menu/Menu.types'
import styled from 'styled-components'

// TODO: this has to be styled
// indexes for the rows are a mess
// solve the console errors

export type FieldAutocompleteAddressProps<FormData> = CommonThreadProps<FormData> & {
  field: MultiInputAutosuggestField<FormData>
}

const WrapperItem = createStyled(styled.div`
  display: flex;
  width: 100%;
`)

export const FieldAutocompleteAddress = <FormData extends {}>(
  props: FieldAutocompleteAddressProps<FormData>,
) => {
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
    <>
      <FieldRowWrapper
        key={`row-${props.fieldIndex}`}
        {...getCssRowStyle('wrapper')}
        readOnly={props.formReadOnly}
      >
        <FieldScrollableWrapper
          key={`field-${props.fieldIndex}`}
          isScrollToError={
            props.field.fields.findIndex((fieldItem) => fieldItem.lens.id() === props.errorFieldId) !==
            -1
          }
          style={props.style}
        >
          <WrapperItem
            {...getFieldMultiInputStyle('item')}
            key={`field-mulit-input-autosuggest-${props.fieldIndex}`}
          >
            <FieldRowItem
              {...commonFieldProps}
              autoFocus={props.autoFocus}
              key={`field-item-${props.field.fields[0].lens.id()}-${0}`}
              field={{
                ...props.field.fields[0],
                onSuggestionSelected: onSelectSuggestion(props.field.fields[0]),
              }}
              fieldIndex={0}
              errorFieldId={props.errorFieldId}
              inputRef={
                undefined /* fieldItemIndex === field.fields.length - 1 ? lastFieldRef : undefined */
              }
              onChange={onChange}
              onError={onError}
              isNotScrollable
            />
          </WrapperItem>
        </FieldScrollableWrapper>
      </FieldRowWrapper>
      <FieldRowWrapper
        key={`row-${props.fieldIndex}`}
        {...getCssRowStyle('wrapper')}
        readOnly={props.formReadOnly}
      >
        <FieldScrollableWrapper
          key={`field-${props.fieldIndex}`}
          isScrollToError={
            props.field.fields.findIndex((fieldItem) => fieldItem.lens.id() === props.errorFieldId) !==
            -1
          }
          style={props.style}
        >
          <WrapperItem
            {...getFieldMultiInputStyle('item')}
            key={`field-mulit-input-autosuggest-${props.fieldIndex}`}
          >
            {props.field.fields.slice(1).map((fieldItem, fieldItemIndex) => (
              <FieldRowItem
                {...commonFieldProps}
                key={`field-item-${fieldItem.lens.id()}-${fieldItemIndex + 1}`}
                field={{ ...fieldItem, onSuggestionSelected: onSelectSuggestion(fieldItem) }}
                fieldIndex={fieldItemIndex + 1}
                errorFieldId={props.errorFieldId}
                inputRef={
                  undefined /* fieldItemIndex === field.fields.length - 1 ? lastFieldRef : undefined */
                }
                onChange={onChange}
                onError={onError}
                isNotScrollable
              />
            ))}
          </WrapperItem>
        </FieldScrollableWrapper>
      </FieldRowWrapper>
    </>
  )
}
