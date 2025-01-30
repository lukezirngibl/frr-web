import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Option } from '../../components/menu/Menu.types'
import { FormTheme, useCSSStyles, useFormTheme } from '../../theme/theme.form'
import { createStyled } from '../../theme/util'
import { FormLens } from '../util'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRowWrapper } from './FieldRow'
import { FieldRowItem } from './FieldRowItem'
import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { useFormConfig } from './form.hooks'
import { useFormFieldErrors } from '../../hooks/useFormFieldError'
import {
  CommonThreadProps,
  FieldInputType,
  MultiInputAutosuggestAddressField,
  TextInputAutosuggestField,
} from './types'
import { Label } from '../../components'
import { Div } from '../../html'

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

export type FieldAutocompleteAddressProps<FormData> = CommonThreadProps<FormData> & {
  field: MultiInputAutosuggestAddressField<FormData>
}

// export const useAddressFields = <FormData extends {}>(
//   firstField: MultiInputAutosuggestAddressField<FormData>,
//   secondRowField?: MultiInputAutosuggestAddressField<FormData>,
// ) => {
//   // First row fields
//   const firstRowFields = firstField.fields
//   // Second row fields
//   const secondRowFields = secondRowField.fields

//   return { firstRowFields, secondRowFields }
// }

export const FieldAutocompleteAddress = <FormData extends {}>(
  props: FieldAutocompleteAddressProps<FormData>,
) => {
  // Form styles
  const theme = useFormTheme()
  const getCssMultiInputStyleFirstRow = useCSSStyles(theme, 'fieldMultiInput')(props.field.firstRow.style)
  const getCssMultiInputStyleSecondRow = useCSSStyles(theme, 'fieldMultiInput')(props.field.secondRow.style)
  const getCssRowStyle = useCSSStyles(theme, 'row')(props.style?.row || {})

  // Error
  const { disableDirtyValidation } = useFormConfig()
  const firstRowError = useFormFieldErrors()
  const secondRowError = useFormFieldErrors()

  const commonFieldProps = {
    autoFocus: false,
    data: props.data,
    disableDirtyValidation,
    formFieldOptions: props.formFieldOptions,
    formReadOnly: props.formReadOnly,
    localeNamespace: props.localeNamespace,
    showValidation: props.showValidation,
    style: props.style,
  }

  // Address search params
  const [searchParams, setSearchParams] = useState({
    ZipCode: '',
    TownName: '',
    StreetName: '',
    HouseNo: '',
  })

  let isSelectSuggestion = false

  const onChange = (lens: FormLens<FormData, any>, value: string) => {
    // Propagate changes to form if not already done through onSelectSuggestion callback
    !isSelectSuggestion && props.onChange(lens, value)
  }

  const [forceRefreshValue, setForceRefreshValue] = useState({
    StreetName: 0,
    HouseNo: 0,
    ZipCode: 0,
    TownName: 0,
  })

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
      props.field.firstRow.fields
        .filter((fieldItem) => fieldItem.lens.id() !== currentField.lens.id())
        .forEach((fieldItem) => {
          const value = suggestion.data[fieldItem.fieldInputType]
          if (value !== undefined) {
            changes.push({ lens: fieldItem.lens, value })

            // Clear error for other fields
            firstRowError.onError({ error: null, fieldId: fieldItem.lens.id() })
          }
        })

      props.field.secondRow?.fields
        .filter((fieldItem) => fieldItem.lens.id() !== currentField.lens.id())
        .forEach((fieldItem) => {
          const value = suggestion.data[fieldItem.fieldInputType]
          if (value !== undefined) {
            changes.push({ lens: fieldItem.lens, value })

            // Clear error for other fields
            secondRowError.onError({ error: null, fieldId: fieldItem.lens.id() })
          }
        })

      // Propagate changes to form
      props.onChangeMulti(changes)
      setForceRefreshValue({
        ...forceRefreshValue,
        [currentField.fieldInputType]: forceRefreshValue[currentField.fieldInputType] + 1,
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
        [FieldInputType.Street, FieldInputType.City].includes(currentField.fieldInputType) &&
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
                  currentField.fieldInputType !== FieldInputType.HouseNr
                    ? item[currentField.fieldInputType]
                    : `${item[currentField.fieldInputType]}${item.HouseNoAddition}`,
                label: `${item.StreetName} ${item.HouseNo}${item.HouseNoAddition} ${item.ZipCode} ${item.TownName}`,
                isTranslated: true,
                data: {
                  [FieldInputType.Street]: item.StreetName,
                  [FieldInputType.HouseNr]: item.HouseNo,
                  [FieldInputType.Zip]: item.ZipCode,
                  [FieldInputType.City]: item.TownName,
                },
              })),
            )
        : Promise.resolve([])
    }

  // this useEffect is used to update the searchParams when the data is changed
  // if a search is performed in one field, the values are stored for the search in another field.
  const fields = props.field.firstRow.fields.concat(props.field.secondRow?.fields || [])
  useEffect(() => {
    setSearchParams({
      StreetName:
        fields
          .filter((field) => field.fieldInputType === FieldInputType.Street)[0]
          ?.lens.get(props.data) || '',
      HouseNo:
        fields
          .filter((field) => field.fieldInputType === FieldInputType.HouseNr)[0]
          ?.lens.get(props.data) || '',
      ZipCode:
        fields.filter((field) => field.fieldInputType === FieldInputType.Zip)[0]?.lens.get(props.data) ||
        '',
      TownName:
        fields
          .filter((field) => field.fieldInputType === FieldInputType.City)[0]
          ?.lens.get(props.data) || '',
    })
  }, [props.data, fields.length])

  // Return readonly form
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

  return (
    <>
      {props.field.firstRow.fields.length > 0 && (
        <FieldRowWrapper
          key={`row-${props.fieldIndex}`}
          {...getCssRowStyle('wrapper')}
          readOnly={props.formReadOnly}
        >
          <FieldScrollableWrapper
            key={`field-${props.fieldIndex}`}
            isScrollToError={
              fields.findIndex((fieldItem) => fieldItem.lens.id() === props.errorFieldId) !== -1
            }
            style={props.style}
          >
            <WrapperItem
              {...getCssMultiInputStyleFirstRow('item')}
              key={`field-mulit-input-autosuggest-${props.fieldIndex}`}
            >
              {!props.formFieldOptions.showMultiInputFieldLabels && props.field.firstRow.label && (
                <Label
                  localeNamespace={props.localeNamespace}
                  error={firstRowError.errorLabel.length > 0}
                  errorLabel={firstRowError.errorLabel}
                  errorDataTestId={firstRowError.errorDataTestId}
                  {...props.field.firstRow.label}
                />
              )}

              {props.field.firstRow.fields.map((fieldItem, fieldItemIndex) => (
                <FieldRowItemWrapper
                  key={`field-item-${fieldItem.lens.id()}-${fieldItemIndex + 2}`}
                  {...getCssMultiInputStyleFirstRow(
                    `itemField${fieldItemIndex + 1}` as keyof FormTheme['fieldMultiInput'],
                  )}
                >
                  <FieldRowItem
                    {...commonFieldProps}
                    field={{
                      ...fieldItem,
                      label: props.formFieldOptions.showMultiInputFieldLabels ? fieldItem.label : null,
                      onSuggestionSelected: onSelectSuggestion(fieldItem),
                      onLoadSuggestions: onLoadSuggestions(fieldItem),
                      forceRefreshValue: forceRefreshValue[fieldItem.fieldInputType],
                    }}
                    fieldIndex={fieldItemIndex}
                    errorFieldId={props.errorFieldId}
                    inputRef={
                      undefined /* fieldItemIndex === field.fields.length - 1 ? lastFieldRef : undefined */
                    }
                    onChange={onChange}
                    onError={firstRowError.onError}
                    isNotScrollable
                  />
                </FieldRowItemWrapper>
              ))}
            </WrapperItem>
          </FieldScrollableWrapper>
        </FieldRowWrapper>
      )}

      {props.field.secondRow && props.field.secondRow.fields.length > 0 && (
        <FieldRowWrapper
          key={`row-${props.fieldIndex + 1}`}
          {...getCssRowStyle('wrapper')}
          readOnly={props.formReadOnly}
        >
          <FieldScrollableWrapper
            key={`field-${props.fieldIndex}`}
            isScrollToError={
              props.field.secondRow.fields.findIndex(
                (fieldItem) => fieldItem.lens.id() === props.errorFieldId,
              ) !== -1
            }
            style={props.style}
          >
            <WrapperItem
              {...getCssMultiInputStyleSecondRow('item')}
              key={`field-mulit-input-autosuggest-${props.fieldIndex}`}
            >
              {!props.formFieldOptions.showMultiInputFieldLabels && props.field.secondRow.label && (
                <Label
                  localeNamespace={props.localeNamespace}
                  error={secondRowError.errorLabel.length > 0}
                  errorLabel={secondRowError.errorLabel}
                  errorDataTestId={secondRowError.errorDataTestId}
                  {...props.field.secondRow.label}
                />
              )}

              {props.field.secondRow.fields.map((fieldItem, fieldItemIndex) => (
                <FieldRowItemWrapper
                  key={`field-item-${fieldItem.lens.id()}-${fieldItemIndex + 2}`}
                  {...getCssMultiInputStyleSecondRow(
                    `itemField${fieldItemIndex + 1}` as keyof FormTheme['fieldMultiInput'],
                  )}
                >
                  <FieldRowItem
                    {...commonFieldProps}
                    field={{
                      ...fieldItem,
                      label: props.formFieldOptions.showMultiInputFieldLabels ? fieldItem.label : null,
                      onSuggestionSelected: onSelectSuggestion(fieldItem),
                      onLoadSuggestions: onLoadSuggestions(fieldItem),
                      forceRefreshValue: forceRefreshValue[fieldItem.fieldInputType],
                      style: { ...fieldItem.style, wrapper: undefined },
                    }}
                    fieldIndex={fieldItemIndex + 2}
                    errorFieldId={props.errorFieldId}
                    inputRef={
                      undefined /* fieldItemIndex === field.fields.length - 1 ? lastFieldRef : undefined */
                    }
                    onChange={onChange}
                    onError={secondRowError.onError}
                    isNotScrollable
                  />
                </FieldRowItemWrapper>
              ))}
            </WrapperItem>
          </FieldScrollableWrapper>
        </FieldRowWrapper>
      )}
    </>
  )
}

const WrapperItem = createStyled(styled.div`
  display: flex;
  width: 100%;
`)

const FieldRowItemWrapper = createStyled(styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`)