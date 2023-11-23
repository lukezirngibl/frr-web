import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Option } from '../../components/menu/Menu.types'
import { useCSSStyles, useFormTheme, useInlineStyle } from '../../theme/theme.form'
import { createStyled } from '../../theme/util'
import { FormLens } from '../util'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRowWrapper } from './FieldRow'
import { FieldRowItem } from './FieldRowItem'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormConfig } from './form.hooks'
import { useFormFieldErrors } from './hooks/useFormFieldError'
import { CommonThreadProps, MultiInputAutosuggestAddressField, TextInputAutosuggestField } from './types'

export type AddressParams = {
  ZipCode: string
  TownName: string
  StreetName: string
  HouseNo: string
}

export type AddressResponse = {
  Canton: string
  CountryCode: string
  HouseKey: string
  HouseNo: string
  HouseNoAddition: string
  ONRP: string
  STRID: string
  StreetName: string
  TownName: string
  ZipAddition: string
  ZipCode: string
}

export type FieldInputType = 'StreetName' | 'HouseNo' | 'ZipCode' | 'TownName'

export type FieldAutocompleteAddressProps<FormData> = CommonThreadProps<FormData> & {
  field: MultiInputAutosuggestAddressField<FormData>
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
  const { onError } = useFormFieldErrors()

  const commonFieldProps = {
    autoFocus: false,
    data: props.data,
    formReadOnly: props.formReadOnly,
    localeNamespace: props.localeNamespace,
    showValidation: props.showValidation,
    disableDirtyValidation,
    style: props.style,
  }

  // Address search params
  const [searchParams, setSearchParams] = useState({
    ZipCode: '',
    TownName: '',
    StreetName: '',
    HouseNo: '',
  })

  if (props.formReadOnly) {
    return (
      <FieldRowWrapper
        key={`row-${props.fieldIndex}`}
        {...getCssRowStyle('wrapper')}
        readOnly={props.formReadOnly}
      >
        <FieldItemReadOnly
          {...commonFieldProps}
          field={props.field as MultiInputAutosuggestAddressField<FormData>}
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

  const [forceRefreshValue, setForceRefreshValue] = useState({ street: 0, houseNr: 0, zip: 0, city: 0 })

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
      setForceRefreshValue({
        ...forceRefreshValue,
        [currentField.lens.id()]: forceRefreshValue[currentField.lens.id()] + 1,
      })
    }

  // Handling the onloadSuggestions with Multiple Inputs
  const onLoadSuggestions =
    (
      currentField: TextInputAutosuggestField<FormData> & {
        fieldInputType: FieldInputType
      },
    ) =>
    (searchString: string) => {
      if (
        (currentField.fieldInputType === 'StreetName' || currentField.fieldInputType === 'TownName') &&
        searchString.length < 3
      ) {
        return Promise.resolve([])
      }
      return searchString > ''
        ? props.field
            .loadAddressSuggestions({ ...searchParams, [currentField.fieldInputType]: searchString })
            .then((address) =>
              address.map((item: AddressResponse) => ({
                value:
                  currentField.fieldInputType !== 'HouseNo'
                    ? item[currentField.fieldInputType]
                    : `${item[currentField.fieldInputType]}${item.HouseNoAddition}`,
                label: `${item.StreetName} ${item.HouseNo}${item.HouseNoAddition} ${item.ZipCode} ${item.TownName}`,
                isTranslated: true,
                data: {
                  street: item.StreetName,
                  houseNr: item.HouseNo,
                  zip: item.ZipCode,
                  city: item.TownName,
                },
              })),
            )
        : Promise.resolve([])
    }

  // this useEffect is used to update the searchParams when the data is changed
  // if a search is performed in one field, the values are stored for the search in another field.
  useEffect(() => {
    setSearchParams({
      StreetName: props.field.fields[0].lens.get(props.data) || '',
      HouseNo: props.field.fields[1].lens.get(props.data) || '',
      ZipCode: props.field.fields[2].lens.get(props.data) || '',
      TownName: props.field.fields[3].lens.get(props.data) || '',
    })
  }, [props.data])

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
            {props.field.fields.slice(0, 2).map((fieldItem, fieldItemIndex) => (
              <FieldRowItem
                {...commonFieldProps}
                key={`field-item-${fieldItem.lens.id()}-${fieldItemIndex}`}
                field={{
                  ...fieldItem,
                  onSuggestionSelected: onSelectSuggestion(fieldItem),
                  onLoadSuggestions: onLoadSuggestions(fieldItem),
                  forceRefreshValue: forceRefreshValue[fieldItem.lens.id()],
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
            ))}
          </WrapperItem>
        </FieldScrollableWrapper>
      </FieldRowWrapper>
      <FieldRowWrapper
        key={`row-${props.fieldIndex + 1}`}
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
            {props.field.fields.slice(2).map((fieldItem, fieldItemIndex) => (
              <FieldRowItem
                {...commonFieldProps}
                key={`field-item-${fieldItem.lens.id()}-${fieldItemIndex + 2}`}
                field={{
                  ...fieldItem,
                  onSuggestionSelected: onSelectSuggestion(fieldItem),
                  onLoadSuggestions: onLoadSuggestions(fieldItem),
                  forceRefreshValue: forceRefreshValue[fieldItem.lens.id()],
                }}
                fieldIndex={fieldItemIndex + 2}
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
