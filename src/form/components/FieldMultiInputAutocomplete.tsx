import React, { useCallback, useEffect, useState } from 'react'

import { Label } from '../../components/Label'
import { createStyled } from '../../theme/util'
import { useCSSStyles, useFormTheme, useInlineStyle } from '../../theme/theme.form'
import { useFormFieldErrors } from './hooks/useFormFieldError'
import { Select } from '../../components/Select'
import { Options } from '../../html'

import { FieldScrollableWrapper } from './FieldScrollableWrapper'
import { CommonThreadProps, MultiInputAutocompleteField } from './types'
import { FieldItemReadOnly } from './FieldItemReadOnly'
import { FieldRowWrapper } from './FieldRow'
import { FieldRowItem } from './FieldRowItem'
import { useFormConfig } from './form.hooks'

type FieldRowProps<FormData> = CommonThreadProps<FormData> & {
  field: MultiInputAutocompleteField<FormData>
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
export const FieldMultiInputAutocomplete = <FormData extends {}>({
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
  const { disableDirtyValidation } = useFormConfig()
  const theme = useFormTheme()

  const getFieldMultiInputStyle = useInlineStyle(theme, 'fieldMultiInput')({ item: field.itemStyle })
  const getRowStyle = useInlineStyle(theme, 'row')(style?.row || {})
  const getCssRowStyle = useCSSStyles(theme, 'row')(style?.row || {})

  // Error
  const [errors, setErrors] = useState([])
  const onError = useCallback((error: { error: string; fieldId: string }) => {
    const errorIndex = errors.findIndex((err) => err.fieldId === error.fieldId)
    const newErrors = [...errors]
    if (errorIndex === -1 && !!error.error) {
      newErrors.push(error)
    } else if (errorIndex > -1) {
      newErrors[errorIndex] = error
    }
    setErrors(newErrors)
  }, [])

  const { errorLabel, errorDataTestId } = useFormFieldErrors({ errors })

  const commonFieldProps = {
    data,
    formReadOnly,
    localeNamespace,
    showValidation,

    style,
  }

  const zipField = field.fields[0]
  const cityField = field.fields[1]

  const [filteredCitiesById, setFilteredCitiesById] = useState<Array<City>>([])

  // Select
  const [selectCityOptions, setSelectCityOptions] = useState<Options<Value>>([])
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [showSelect, setShowSelect] = useState<boolean>(false)

  // fields value
  const [isCityValueUpdated, setIsCityValueUpdated] = useState<boolean>(false)

  const changeCityValue = (value: string | null) => {
    onChange(cityField.lens, value)
    setIsCityValueUpdated(true)
  }

  const onKeyUp = (value: string) => {
    if (value !== '') {
      const target = field.cities.filter((city) => city.zip.toString().startsWith(value))
      setFilteredCitiesById(target)
      setSelectCityOptions(target.map((t: City) => ({ label: t.searchstring, value: t.id })))

      if (!!selectedCity && selectedCity.id.toString() !== value) setSelectedCity(null)
    } else {
      setSelectCityOptions([])
      setFilteredCitiesById([])
    }
  }

  useEffect(() => {
    if (filteredCitiesById.length > 0) setShowSelect(true)
    if (filteredCitiesById.length === 1) setSelectedCity(filteredCitiesById[0])
    else if (filteredCitiesById.length === 0) setShowSelect(false)
  }, [filteredCitiesById])

  useEffect(() => {
    if (!!selectedCity) {
      changeCityValue(selectedCity.city)
      setShowSelect(false)
    }
  }, [selectedCity])

  useEffect(() => {
    if (!!selectedCity && isCityValueUpdated) {
      onChange(zipField.lens, selectedCity.zip.toString())
      setIsCityValueUpdated(false)
    }
  }, [isCityValueUpdated])

  if (formReadOnly) {
    return (
      <FieldRowWrapper key={`row-${fieldIndex}`} {...getCssRowStyle('wrapper')} readOnly={formReadOnly}>
        <FieldItemReadOnly
          {...commonFieldProps}
          field={field as MultiInputAutocompleteField<FormData>}
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
          <FieldRowItem
            {...commonFieldProps}
            key={`zipField-item`}
            field={zipField}
            fieldIndex={0}
            errorFieldId={errorFieldId}
            onChange={onChange}
            onError={onError}
            onKeyUp={onKeyUp}
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
          )}
        </WrapperItem>
      </FieldScrollableWrapper>
    </FieldRowWrapper>
  )
}
