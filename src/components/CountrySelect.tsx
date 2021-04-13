import React from 'react'
import { COUNTRIES_ALPHA_3 } from '../assets/countries'
import { Select, Props as SelectProps } from './Select'

export type Props = Omit<SelectProps, 'options'>

export const CountrySelect = (props: Props) => {
  return (
    <Select
      {...props}
      options={COUNTRIES_ALPHA_3.map((country) => ({ label: `country.${country}`, value: country }))}
      alphabetize
    />
  )
}
