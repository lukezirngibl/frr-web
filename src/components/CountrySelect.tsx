import React from 'react'
import { getCountryOptions } from '../util'
import { getLanguageContext } from '../theme/language'
import { Select, Props as SelectProps } from './Select'

export type Props = Omit<SelectProps, 'options'>

export const CountrySelect = (props: Props) => {
  const language = React.useContext(getLanguageContext())

  return <Select {...props} options={getCountryOptions[language]} />
}
