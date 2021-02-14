import React from 'react'
import { getCountryOptions } from '../util'
import { Dropdown, Props as DropdownProps } from './Dropdown'
import { getLanguageContext } from '../theme/language'

export type Props = Omit<DropdownProps, 'options'>

export const CountryDropdown = (props: Props) => {
  const language = React.useContext(getLanguageContext())

  return <Dropdown {...props} options={getCountryOptions[language]} />
}
