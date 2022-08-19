import React, { useEffect, useState } from 'react'

import { Label } from '../components/Label'
import { createStyled } from '../theme/util'
import { useCSSStyles, useFormTheme, useInlineStyle } from '../theme/theme.form'
import { useFormFieldErrors } from './hooks/useFormFieldError'
import { Options } from '../html'

import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { CommonThreadProps, MultiInputAutosuggestField } from './types'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRowWrapper } from './FieldRow'
import { FieldRowItem } from './FieldRowItem'
import { useFormConfig } from './form.hooks'

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

  // const zipField = field.fields[0]
  // const cityField = field.fields[1]

  // const [filteredCitiesById, setFilteredCitiesById] = useState<Array<City>>([])

  // Select
  // const [selectCityOptions, setSelectCityOptions] = useState<Options<Value>>([])
  // const [selectedCity, setSelectedCity] = useState<City | null>(null)
  // const [showSelect, setShowSelect] = useState<boolean>(false)

  // // fields value
  // const [isCityValueUpdated, setIsCityValueUpdated] = useState<boolean>(false)

  // const changeCityValue = (value: string | null) => {
  //   onChange(cityField.lens, value)
  //   setIsCityValueUpdated(true)
  // }

  // const onKeyUp = (value: string) => {
  //   if (value !== '') {
  //     const target = field.cities.filter((city) => city.zip.toString().startsWith(value))
  //     setFilteredCitiesById(target)
  //     setSelectCityOptions(target.map((t: City) => ({ label: t.searchstring, value: t.id })))

  //     if (!!selectedCity && selectedCity.id.toString() !== value) setSelectedCity(null)
  //   } else {
  //     setSelectCityOptions([])
  //     setFilteredCitiesById([])
  //   }
  // }

  // useEffect(() => {
  //   if (filteredCitiesById.length > 0) setShowSelect(true)
  //   if (filteredCitiesById.length === 1) setSelectedCity(filteredCitiesById[0])
  //   else if (filteredCitiesById.length === 0) setShowSelect(false)
  // }, [filteredCitiesById])

  // useEffect(() => {
  //   if (!!selectedCity) {
  //     changeCityValue(selectedCity.city)
  //     setShowSelect(false)
  //   }
  // }, [selectedCity])

  // useEffect(() => {
  //   if (!!selectedCity && isCityValueUpdated) {
  //     onChange(zipField.lens, selectedCity.zip.toString())
  //     setIsCityValueUpdated(false)
  //   }
  // }, [isCityValueUpdated])

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
              field={fieldItem}
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


const FieldRowWithSelect = ({ }) => {
  
}