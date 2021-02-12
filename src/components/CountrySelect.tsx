import React from 'react'
import { TranslationGeneric, getCountryOptions } from '../util'
import { getLanguageContext } from '../theme/language'
import { Select, Props as SelectProps } from './Select'

export type Props<TM> = Omit<SelectProps<TM>, 'options'>

export const CountrySelect = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const language = React.useContext(getLanguageContext())

  return <Select {...props} options={getCountryOptions[language]} />
}
