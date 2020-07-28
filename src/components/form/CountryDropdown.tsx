import React from 'react'
import { TranslationGeneric } from '../../util'
import { Dropdown, Props as DropdownProps } from './Dropdown'
import { getLanguageContext, Language } from '../../theme/language'
import { COUNTRIES_EN } from '../../assets/countries-en'
import { COUNTRIES_FR } from '../../assets/countries-fr'
import { COUNTRIES_IT } from '../../assets/countries-it'
import { COUNTRIES_DE } from '../../assets/countries-de'

export type Props<TM> = Omit<DropdownProps<TM>, 'options'>

const getCountryOptions: Record<
  Language,
  Array<{ name: string; value: string }>
> = {
  [Language.EN]: COUNTRIES_EN.map(c => ({
    name: c.name,
    value: c['alpha3'].toUpperCase(),
  })),
  [Language.IT]: COUNTRIES_IT.map(c => ({
    name: c.name,
    value: c['alpha3'].toUpperCase(),
  })),
  [Language.FR]: COUNTRIES_FR.map(c => ({
    name: c.name,
    value: c['alpha3'].toUpperCase(),
  })),
  [Language.DE]: COUNTRIES_DE.map(c => ({
    name: c.name,
    value: c['alpha3'].toUpperCase(),
  })),
}

export const CountryDropdown = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const language = React.useContext(getLanguageContext())

  return <Dropdown {...props} options={getCountryOptions[language]} />
}
