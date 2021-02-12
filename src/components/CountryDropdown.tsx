import React from 'react'
import { TranslationGeneric, getCountryOptions } from '../util'
import { Dropdown, Props as DropdownProps } from './Dropdown'
import { getLanguageContext, Language } from '../theme/language'

export type Props<TM> = Omit<DropdownProps<TM>, 'options'>

export const CountryDropdown = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const language = React.useContext(getLanguageContext())

  return <Dropdown {...props} options={getCountryOptions[language]} />
}
