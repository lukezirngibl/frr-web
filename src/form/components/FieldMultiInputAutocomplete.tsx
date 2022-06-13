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

  const [selectCityOptions, setSelectCityOptions] = useState<Options<Value>>([])
  const [filteredCitiesById, setFilteredCitiesById] = useState<Array<City>>()
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [showSelect, setShowSelect] = useState<boolean>(false)

  const onKeyUp = (value: string) => {
    if (value !== '') {
      setShowSelect(true)
      const target = field.cities.filter((city) => city.zip.toString().startsWith(value))
      setFilteredCitiesById(target)
      setSelectCityOptions(target.map((t: City) => ({ label: t.searchstring, value: t.id })))
      if (target.length === 1) setSelectedCity(target[0])
      if (target.length === 0) setShowSelect(false)
    } else {
      setShowSelect(false)
      setSelectCityOptions([])
      setFilteredCitiesById([])
      setSelectedCity(null)
    }
  }

  useEffect(() => {
    if (!!selectedCity) {
      setSelectCityOptions([{ label: selectedCity.searchstring, value: selectedCity.id }])
      onChange(zipField.lens, selectedCity.zip.toString())
      onChange(cityField.lens, selectedCity.city)
      setShowSelect(false)
    }
    if (selectedCity === null) {
      setSelectCityOptions([])
      onChange(zipField.lens, null)
      onChange(cityField.lens, null)
    }
  }, [selectedCity])

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
